package api

import (
	"storyx/configs"
	"storyx/pkg/db"

	"github.com/gin-gonic/gin"
)

type Server struct {
	route *gin.Engine

	storyDB     db.Ops
	paragraphDB db.Ops
}

func Init() *Server {
	server := &Server{}
	conf := configs.InitConfig()

	database := db.InitPGDatabase(conf)
	server.storyDB = &db.StoryDB{PGDatabase: database}
	server.paragraphDB = &db.ParagraphDB{PGDatabase: database}

	r := gin.Default()
	storyGroup := r.Group("story")
	{
		storyGroup.POST("/create", server.CreateStory)
		storyGroup.GET("/read", server.ReadStory)
		storyGroup.POST("/update", server.UpdateStory)
		storyGroup.POST("/delete", server.DeleteStory)
	}
	server.route = r

	return server
}

func (s *Server) Run(addr string) error {
	return s.route.Run(addr)
}
