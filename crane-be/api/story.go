package api

import (
	"fmt"
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

	req.Sid = utils.GenerateUUID()

	storyService := services.NewStoryService(s.db)
	story := storyService.CreateStory(&req)
	c.JSON(http.StatusOK, utils.OK(story))
}

func (s *Server) QueryStories(c *gin.Context) {
	page := c.Query("page")
	size := c.Query("size")
	sort := c.Query("sort")
	keyword := c.Query("word")

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

	if sort == "" {
		sort = "desc"
	}

	storyService := services.NewStoryService(s.db)
	stories := storyService.QueryStories(pageNum, pageSize, sort, keyword)
	count := storyService.CountStories(keyword)

	ret := make(map[string]interface{})
	ret["records"] = count
	ret["count"] = count/int64(pageSize) + 1
	ret["stories"] = stories
	c.JSON(http.StatusOK, utils.OK(ret))
}

func (s *Server) ViewStory(c *gin.Context) {
	id := c.Query("id")
	if id == "" {
		c.JSON(http.StatusUnauthorized, utils.ERROR(fmt.Errorf("id must not be null")))
	}

	storyService := services.NewStoryService(s.db)
	story := storyService.ViewStory(id)
	c.JSON(http.StatusOK, utils.OK(story))
}

func (s *Server) UpdateStory(c *gin.Context) {
	var req models.UpdateStoryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	storyService := services.NewStoryService(s.db)
	story := storyService.UpdateStory(&req)
	c.JSON(http.StatusOK, utils.OK(story))
}
