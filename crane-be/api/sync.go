package api

import (
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

// UploadToJianGuoYun upload a single story to jianguoyun. If there is conflicts in local
// and cloud, The local version will override the cloud version
func (s *Server) UploadToJianGuoYun(c *gin.Context) {
	var req models.UploadToJianGuoYunReq
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
