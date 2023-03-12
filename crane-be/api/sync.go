package api

import (
	"fmt"
	"net/http"

	"papercrane/models"
	"papercrane/services"
	"papercrane/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) Save(c *gin.Context) {
	var req models.SaveSyncReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	syncService := services.NewSyncervice(s.cache, s.db)
	syncService.SaveSync(&req)
	c.JSON(http.StatusOK, utils.OK("saved"))
}

// Upload upload a single story to server. If there are conflicts between local
// and remote, The local version will override the remote version
func (s *Server) Upload(c *gin.Context) {
	var req models.SyncReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	storyService := services.NewStoryService(s.db)
	story := storyService.ViewStory(req.StoryId)
	syncService := services.NewSyncervice(s.cache, s.db)
	syncService.Init(req.Type)
	err := syncService.UploadStory(story)
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, utils.OK("upload story successfully"))
}

// Download download a single story from server. If there are conflicts between
// local and remote, The remote version will override the local version
func (s *Server) Download(c *gin.Context) {
	var req models.SyncReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	syncService := services.NewSyncervice(s.cache, s.db)
	syncService.Init(req.Type)
	content, err := syncService.DownloadStory(req)
	if err != nil {
		// there does not exist story with this id in remote
		c.JSON(http.StatusOK, utils.ERROR(fmt.Errorf("story does not exist in remote")))
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

// SyncWithJianGuoYun sync all stories from local to remote
// case 1:
//  story exist in remote and does not exist in local, download it from remote
// case 2:
//	story exist in local and does not exist in remote, upload it to remote
// case 3:
//	story exist both in local and remote, local version will be final version
func (s *Server) Sync(c *gin.Context) {
	var req models.SyncAllReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	syncService := services.NewSyncervice(s.cache, s.db)
	storyService := services.NewStoryService(s.db)
	stories := storyService.GetAllStoryIDList()
	syncService.Init(req.Type)
	syncService.Sync(req, stories)
	c.JSON(http.StatusOK, utils.OK("finish to sync"))
}

func (s *Server) Status(c *gin.Context) {
	syncService := services.NewSyncervice(s.cache, s.db)
	status := syncService.CheckStatus()
	c.JSON(http.StatusOK, utils.OK(status))
}
