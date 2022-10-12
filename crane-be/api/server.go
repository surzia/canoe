package api

import (
	"papercrane/middleware"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	db             *gorm.DB
	staticFilePath string
	Router         *gin.Engine
}

func NewServer(db *gorm.DB, dir string) *Server {
	server := &Server{db: db, staticFilePath: dir}
	r := gin.Default()
	r.Use(static.Serve("/", static.LocalFile(server.staticFilePath, true)))
	r.Use(middleware.CORSMiddleware())

	// customize route group
	storyGourp := r.Group("story")
	{
		storyGourp.POST("/create", server.CreateStory)
		storyGourp.GET("/query", server.QueryStories)
		storyGourp.GET("/view", server.ViewStory)
		storyGourp.POST("/update", server.UpdateStory)
		storyGourp.GET("/search", server.SearchStory)
	}

	categoryGroup := r.Group("category")
	{
		categoryGroup.POST("/create", server.CreateCategory)
		categoryGroup.GET("/query", server.QueryCategories)
		categoryGroup.GET("/getid", server.GetCategoryIDByName)
	}

	tagGroup := r.Group("tag")
	{
		tagGroup.POST("/create", server.CreateTag)
		tagGroup.GET("/query", server.QueryTags)
	}

	server.Router = r
	return server
}
