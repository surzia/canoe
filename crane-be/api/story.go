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

	// validate category
	categoryService := services.NewCategoryService(s.db)
	exist := categoryService.IsExistCategory(req.CategoryID)
	if !exist {
		c.JSON(http.StatusBadRequest, utils.ERROR(fmt.Errorf("category id %d does not exist", req.CategoryID)))
		return
	}

	// validate tags
	tagService := services.NewTagService(s.db)
	valid := tagService.AreExistTags(req.TagsID)
	if !valid {
		c.JSON(http.StatusBadRequest, utils.ERROR(fmt.Errorf("tags id %v does not exist", req.TagsID)))
		return
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
	count := storyService.CountStories()

	ret := make(map[string]interface{})
	ret["count"] = count/int64(pageSize) + 1
	ret["stories"] = stories
	c.JSON(http.StatusOK, utils.OK(ret))
}

func (s *Server) ViewStory(c *gin.Context) {
	id := c.Query("id")
	if id == "" {
		c.JSON(http.StatusUnauthorized, utils.ERROR(fmt.Errorf("id must not be null")))
	}

	storyId, _ := strconv.Atoi(id)
	storyService := services.NewStoryService(s.db)
	story := storyService.ViewStory(storyId)
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

func (s *Server) SearchStory(c *gin.Context) {
	word := c.Query("wd")
	req := models.SearchStoryRequest{
		Query: word,
	}

	storyService := services.NewStoryService(s.db)
	stories := storyService.SearchStory(&req)
	c.JSON(http.StatusOK, utils.OK(stories))
}
