package api

import (
	"fmt"
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
	category := categoryService.CreateCategory(&req)
	c.JSON(http.StatusOK, utils.OK(category))
}

func (s *Server) QueryCategories(c *gin.Context) {
	categoryService := services.NewCategoryService(s.db)
	categories := categoryService.QueryCategories()
	c.JSON(http.StatusOK, utils.OK(categories))
}

func (s *Server) GetCategoryIDByName(c *gin.Context) {
	name := c.Query("c")
	if name == "" {
		c.JSON(http.StatusBadRequest, utils.ERROR(fmt.Errorf("c does not exist in url param")))
		return
	}

	categoryService := services.NewCategoryService(s.db)
	id := categoryService.GetCategoryIDByName(name)
	c.JSON(http.StatusOK, utils.OK(id))
}
