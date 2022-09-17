package api

import (
	"net/http"

	"github.com/surzia/crane-be/models"
	"github.com/surzia/crane-be/services"
	"github.com/surzia/crane-be/utils"

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
