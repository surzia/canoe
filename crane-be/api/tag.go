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

func (s *Server) CreateTag(c *gin.Context) {
	var req models.CreateTagRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	tagService := services.NewTagService(s.db)
	tag := tagService.CreateTag(&req)
	c.JSON(http.StatusOK, utils.OK(tag))
}

func (s *Server) QueryTags(c *gin.Context) {
	tagService := services.NewTagService(s.db)
	tags := tagService.QueryTags()
	c.JSON(http.StatusOK, utils.OK(tags))
}

func (s *Server) QueryTagByID(c *gin.Context) {
	id := c.Query("id")
	if id == "" {
		c.JSON(http.StatusUnauthorized, utils.ERROR(fmt.Errorf("id must not be null")))
	}

	tagId, _ := strconv.Atoi(id)
	tagService := services.NewTagService(s.db)
	tag := tagService.QueryTagByID(tagId)
	c.JSON(http.StatusOK, utils.OK(tag))
}

func (s *Server) QueryTagsByIDList(c *gin.Context) {
	var req models.TagIDListRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	tagService := services.NewTagService(s.db)
	tags := tagService.QueryTagsByIDList(req)
	c.JSON(http.StatusOK, utils.OK(tags))
}

func (s *Server) QueryIDsByTagList(c *gin.Context) {
	var req models.TagsListRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	tagService := services.NewTagService(s.db)
	ids := tagService.QueryIDsByTagList(req)
	c.JSON(http.StatusOK, utils.OK(ids))
}
