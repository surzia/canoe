package api

import (
	"net/http"
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
