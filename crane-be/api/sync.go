package api

import (
	"encoding/json"
	"net/http"

	"papercrane/models"
	"papercrane/services"
	"papercrane/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) Save(c *gin.Context) {
	var req models.SaveSyncReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusNotFound, utils.ERROR(err))
		return
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
		c.JSON(http.StatusBadRequest, utils.ERROR(err))
		return
	}

	story, err := s.upload(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ERROR(err))
		return
	}

	syncService := services.NewSyncervice(s.cache, s.db)
	syncService.Init(req.Type)
	err = syncService.UploadStory(&story)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ERROR(err))
		return
	}

	c.JSON(http.StatusOK, utils.OK(req))
}

func (s *Server) upload(req models.SyncReq) (models.StoryFeed, error) {
	storyService := services.NewStoryService(s.db)
	paragraphService := services.NewParagraphService(s.db)
	sto, err := storyService.ViewStory(req.StoryId)
	if err != nil {
		return models.StoryFeed{}, err
	}
	story := models.StoryFeed{
		Sid:       sto.Sid,
		CreatedAt: sto.CreatedAt,
		UpdatedAt: sto.UpdatedAt,
		Content:   []models.Paragraph{},
	}
	paragraphService.UpdateStoryContent(&story)

	return story, err
}

// Download download a single story from server. If there are conflicts between
// local and remote, The remote version will override the local version
func (s *Server) Download(c *gin.Context) {
	var req models.SyncReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, utils.ERROR(err))
		return
	}

	syncService := services.NewSyncervice(s.cache, s.db)
	syncService.Init(req.Type)
	content, err := syncService.DownloadStory(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ERROR(err))
		return
	}

	err = s.download(content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ERROR(err))
		return
	}

	c.JSON(http.StatusOK, utils.OK(req))
}

func (s *Server) download(content []byte) error {
	var story models.StoryFeed
	err := json.Unmarshal(content, &story)
	if err != nil {
		return err
	}

	storyService := services.NewStoryService(s.db)
	paragraphService := services.NewParagraphService(s.db)
	storyService.UpdateStory(&story)
	paragraphService.UpdateParagraph(&story)
	return nil
}

// Sync all stories from local to remote
// case 1:
//  story exist in remote and does not exist in local, download it from remote
// case 2:
//	story exist in local and does not exist in remote, upload it to remote
// case 3:
//	story exist both in local and remote, local version will be final version
func (s *Server) Sync(c *gin.Context) {
	var req models.SyncAllReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusNotFound, utils.ERROR(err))
		return
	}

	syncService := services.NewSyncervice(s.cache, s.db)
	syncService.Init(req.Type)
	remote := syncService.GetAllStoryIDList()
	storyService := services.NewStoryService(s.db)
	local := storyService.GetAllStoryIDList()
	// find all stories only exist in remote
	storyMap := make(map[string]bool)
	uploadStoryList := []string{}
	downloadStoryList := []string{}
	for _, v := range local {
		if _, ok := storyMap[v.Sid]; !ok {
			storyMap[v.Sid] = true
		}
		uploadStoryList = append(uploadStoryList, v.Sid)
	}
	for _, v := range remote {
		if _, ok := storyMap[v]; !ok {
			downloadStoryList = append(downloadStoryList, v)
		}
	}

	for _, uploadStory := range uploadStoryList {
		r := models.SyncReq{
			StoryId: uploadStory,
			Type:    req.Type,
		}
		story, err := s.upload(r)
		if err != nil {
			c.JSON(http.StatusInternalServerError, utils.ERROR(err))
			return
		}
		err = syncService.UploadStory(&story)
		if err != nil {
			c.JSON(http.StatusInternalServerError, utils.ERROR(err))
			return
		}
	}

	for _, downloadStory := range downloadStoryList {
		r := models.SyncReq{
			StoryId: downloadStory,
			Type:    req.Type,
		}
		content, err := syncService.DownloadStory(r)
		if err != nil {
			c.JSON(http.StatusInternalServerError, utils.ERROR(err))
			return
		}

		err = s.download(content)
		if err != nil {
			c.JSON(http.StatusInternalServerError, utils.ERROR(err))
			return
		}
	}
	c.JSON(http.StatusOK, utils.OK("finish to sync"))
}

func (s *Server) Status(c *gin.Context) {
	syncService := services.NewSyncervice(s.cache, s.db)
	status := syncService.CheckStatus()
	c.JSON(http.StatusOK, utils.OK(status))
}
