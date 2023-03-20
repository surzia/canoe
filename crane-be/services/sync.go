package services

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"papercrane/dao"
	"papercrane/models"

	"github.com/patrickmn/go-cache"
	"github.com/studio-b12/gowebdav"
	"gorm.io/gorm"
)

const ROOT = "papercrane"

var SupportedServer = map[string]string{
	"nutstore": "https://dav.jianguoyun.com/dav/",
}

type SyncService struct {
	cache  *cache.Cache
	db     *gorm.DB
	client *gowebdav.Client
}

func NewSyncervice(cache *cache.Cache, db *gorm.DB) *SyncService {
	return &SyncService{
		cache: cache,
		db:    db,
	}
}

func (s *SyncService) SaveSync(req *models.SaveSyncReq) {
	s.cache.Set(fmt.Sprintf("%s-username", req.Type), req.Username, 24*time.Hour)
	s.cache.Set(fmt.Sprintf("%s-password", req.Type), req.Password, 24*time.Hour)
	s.cache.Set(req.Type, true, 24*time.Hour)

	syncDao := dao.NewSyncDao(s.db)
	syncDao.CreateSync(req)
}

func (s *SyncService) Init(server string) error {
	serverAddr, ok := SupportedServer[server]
	if !ok {
		return fmt.Errorf("unsupported server type")
	}
	syncDao := dao.NewSyncDao(s.db)
	username, password := syncDao.FetchUsernameAndPasswordByType(server)
	c := gowebdav.NewClient(serverAddr, username, password)
	err := c.Mkdir(ROOT, 0644)
	if err != nil {
		return err
	}
	s.client = c
	return nil
}

func (s *SyncService) UploadStory(req *models.StoryFeed) error {
	if req == nil {
		return fmt.Errorf("story does not exist")
	}
	webdavFilePath := fmt.Sprintf("%s/%s.json", ROOT, req.Sid)
	story, _ := json.Marshal(req)
	s.client.Write(webdavFilePath, story, 0644)
	return nil
}

func (s *SyncService) DownloadStory(req models.SyncReq) ([]byte, error) {
	webdavFilePath := fmt.Sprintf("%s/%s.json", ROOT, req.StoryId)
	content, err := s.client.Read(webdavFilePath)
	return content, err
}

func (s *SyncService) GetAllStoryIDList() []string {
	storyIDs := []string{}
	files, _ := s.client.ReadDir(ROOT)
	for _, file := range files {
		//notice that [file] has os.FileInfo type
		filename := strings.Split(file.Name(), ".")
		sid := filename[len(filename)-1]
		storyIDs = append(storyIDs, sid)
	}
	return storyIDs
}

func (s *SyncService) CheckStatus() []string {
	status := []string{}

	for k := range SupportedServer {
		if _, found := s.cache.Get(k); found {
			status = append(status, k)
		} else {
			syncDao := dao.NewSyncDao(s.db)
			if ok := syncDao.CheckStatus(k); ok {
				status = append(status, k)
			}
		}
	}

	return status
}
