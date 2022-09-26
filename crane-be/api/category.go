package api

import (
	"net/http"
	"papercrane/models"
	"papercrane/services"
	"papercrane/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) CreateCategory(c *gin.Context) {
	var req models.CreateCategoryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	categoryService := services.NewCategoryService(s.db)
	story := categoryService.CreateCategory(&req)
	c.JSON(http.StatusOK, utils.OK(story))
}
