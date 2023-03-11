package services

import (
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
	"jianguo": "https://dav.jianguoyun.com/dav/",
}

type SyncService struct {
	cache *cache.Cache
	db    *gorm.DB
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

	syncDao := dao.NewSyncDao(s.db)
	syncDao.CreateSync(req)
}

func (s *SyncService) init(server string) (*gowebdav.Client, error) {
	serverAddr, ok := SupportedServer[server]
	if !ok {
		return nil, fmt.Errorf("unsupported server type")
	}
	syncDao := dao.NewSyncDao(s.db)
	username, password := syncDao.FetchUsernameAndPasswordByType(server)
	c := gowebdav.NewClient(serverAddr, username, password)
	err := c.Mkdir(ROOT, 0644)
	if err != nil {
		return nil, err
	}
	return c, nil
}

func (s *SyncService) UploadStory(story *models.Story, server string) error {
	if *story.HasImage {
		return fmt.Errorf("story with images is not supported")
	}
	c, err := s.init(server)
	if err != nil {
		return err
	}
	webdavFilePath := fmt.Sprintf("%s/%s.md", ROOT, story.Sid)
	c.Write(webdavFilePath, []byte(story.Content), 0644)
	return nil
}

func (s *SyncService) DownloadStory(req models.SyncReq) (string, error) {
	c, err := s.init(req.Type)
	if err != nil {
		return "", err
	}
	webdavFilePath := fmt.Sprintf("%s/%s.md", ROOT, req.StoryId)
	content, err := c.Read(webdavFilePath)
	return string(content), err
}

func (s *SyncService) Sync(req models.SyncAllReq, stories []models.Story) error {
	c, err := s.init(req.Type)
	if err != nil {
		return err
	}
	localMap := make(map[string]models.Story)
	remoteMap := make(map[string]bool)
	for _, story := range stories {
		localMap[story.Sid] = story
	}
	files, _ := c.ReadDir(ROOT)
	for _, file := range files {
		//notice that [file] has os.FileInfo type
		filename := strings.Split(file.Name(), ".")
		sid := filename[len(filename)-1]
		remoteMap[sid] = true
	}

	for _, v := range localMap {
		// local story will force-update remote story
		err = s.UploadStory(&v, req.Type)
		if err != nil {
			return err
		}
	}
	for k := range remoteMap {
		// remote story will be downloaded if it's not exist in local
		if _, ok := localMap[k]; !ok {
			r := models.SyncReq{StoryId: k, Type: req.Type}
			_, err = s.DownloadStory(r)
			if err != nil {
				return err
			}
		}
	}

	return nil
}
