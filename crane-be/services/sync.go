package services

import (
	"fmt"

	"papercrane/models"

	"github.com/studio-b12/gowebdav"
)

type JianGuoService struct {
	Server   string
	User     string
	Password string
	Root     string
}

func NewJianGuoService(server, user, passwd string) *JianGuoService {
	return &JianGuoService{
		Server:   server,
		User:     user,
		Password: passwd,
		Root:     "papercrane",
	}
}

func (jg *JianGuoService) init() *gowebdav.Client {
	client := gowebdav.NewClient(jg.Server, jg.User, jg.Password)
	err := client.Mkdir(jg.Root, 0644)
	if err != nil {
		panic(err)
	}
	return client
}

func (jg *JianGuoService) UploadStoryToJianGuoYun(story *models.Story) error {
	if *story.HasImage {
		return fmt.Errorf("story with images is not supported")
	}
	c := jg.init()

	webdavFilePath := fmt.Sprintf("%s/%s.md", jg.Root, story.Sid)
	c.Write(webdavFilePath, []byte(story.Content), 0644)
	return nil
}

func (jg *JianGuoService) DownloadStoryFromJianGuoYun(req models.JianGuoYunReq) (string, bool) {
	c := jg.init()
	webdavFilePath := fmt.Sprintf("%s/%s.md", jg.Root, req.StoryId)
	content, _ := c.Read(webdavFilePath)
	return string(content), true
}
