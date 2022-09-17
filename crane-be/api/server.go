package api

import (
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

	// customize route group
	storyGourp := r.Group("story")
	{
		storyGourp.POST("/create", server.CreateStory)
		storyGourp.GET("/query", server.QueryStories)
		storyGourp.GET("/view", server.ViewStory)
	}

	server.Router = r
	return server
}
