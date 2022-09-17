package api

import (
	"net/http"
	"strconv"

	"papercrane/models"
	"papercrane/services"
	"papercrane/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) CreateStory(c *gin.Context) {
	var req models.CreateStoryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	storyService := services.NewStoryService(s.db)
	story := storyService.CreateStory(&req)
	c.JSON(http.StatusOK, utils.OK(story))
}

func (s *Server) QueryStories(c *gin.Context) {
	page := c.Query("page")
	size := c.Query("size")

	var pageNum, pageSize int
	if page == "" {
		pageNum = 10
	} else {
		pageNum, _ = strconv.Atoi(page)
	}

	if size == "" {
		pageSize = 0
	} else {
		pageSize, _ = strconv.Atoi(size)
	}

	storyService := services.NewStoryService(s.db)
	stories := storyService.QueryStories(pageNum, pageSize)
	c.JSON(http.StatusOK, utils.OK(stories))
}
