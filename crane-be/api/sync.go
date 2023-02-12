package api

import (
	"fmt"
	"net/http"

	"papercrane/models"
	"papercrane/services"
	"papercrane/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) ConnectToJianGuoYun(c *gin.Context) {
	var req models.JianGuoConnectReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	s.JGUser = req.User
	s.JGPasswd = req.Password
	c.JSON(http.StatusOK, utils.OK("connected to jianguoyun"))
}

// UploadToJianGuoYun upload a single story to jianguoyun. If there are conflicts between local
// and remote, The local version will override the cloud version
func (s *Server) UploadToJianGuoYun(c *gin.Context) {
	var req models.JianGuoYunReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	storyService := services.NewStoryService(s.db)
	story := storyService.ViewStory(req.StoryId)
	jianguoService := services.NewJianGuoService(s.JGServer, s.JGUser, s.JGPasswd)
	err := jianguoService.UploadStoryToJianGuoYun(story)
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, utils.OK("upload story to jianguoyun successfully"))
}

// DownloadFromJianGuoYun download a single story from jianguoyun. If there are conflicts between
// local and remote, The remote version will override the local version
func (s *Server) DownloadFromJianGuoYun(c *gin.Context) {
	var req models.JianGuoYunReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	jianguoService := services.NewJianGuoService(s.JGServer, s.JGUser, s.JGPasswd)
	content, ok := jianguoService.DownloadStoryFromJianGuoYun(req)
	if !ok {
		// there does not exist story with this id in remote
		c.JSON(http.StatusOK, utils.ERROR(fmt.Errorf("story does not exist in jianguoyun")))
		return
	}

	storyService := services.NewStoryService(s.db)
	updated := &models.UpdateStoryRequest{
		Sid:      req.StoryId,
		Content:  content,
		HasImage: false,
	}
	story := storyService.UpdateStory(updated)
	c.JSON(http.StatusOK, utils.OK(story))
}
