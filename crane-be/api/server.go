package api

import (
	"papercrane/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	db     *gorm.DB
	Router *gin.Engine
}

func NewServer(db *gorm.DB) *Server {
	server := &Server{db: db}
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// customize route group
	storyGourp := r.Group("story")
	{
		storyGourp.POST("/create", server.CreateStory)
		storyGourp.GET("/query", server.QueryStories)
		storyGourp.GET("/view", server.ViewStory)
		storyGourp.POST("/update", server.UpdateStory)
	}

	categoryGroup := r.Group("category")
	{
		categoryGroup.POST("/create", server.CreateCategory)
		categoryGroup.GET("/query", server.QueryCategories)
	}

	tagGroup := r.Group("tag")
	{
		tagGroup.POST("/create", server.CreateTag)
		tagGroup.GET("/query", server.QueryTags)
	}

	server.Router = r
	return server
}
