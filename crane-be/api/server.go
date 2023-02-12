package api

import (
	"papercrane/middleware"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	db             *gorm.DB
	reactFilePath  string
	staticFilePath string
	Router         *gin.Engine

	// jianguo webdav setting
	JGServer string
	JGUser   string
	JGPasswd string
}

func NewServer(db *gorm.DB, dir string, staticPath string) *Server {
	server := &Server{
		db:             db,
		reactFilePath:  dir,
		staticFilePath: staticPath,
		JGServer:       "https://dav.jianguoyun.com/dav/",
	}
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	// combine gin router with react router
	fs := static.LocalFile(server.reactFilePath, true)
	st := static.LocalFile(server.staticFilePath, true)
	r.Use(static.Serve("/", fs))
	r.Use(static.Serve("/images", st))
	r.Use(static.Serve("/edit", fs))
	r.Use(static.Serve("/view", fs))
	r.Use(middleware.CORSMiddleware())

	// customize route group
	storyGourp := r.Group("story")
	{
		storyGourp.POST("/create", server.CreateStory)
		storyGourp.GET("/query", server.QueryStories)
		storyGourp.GET("/view", server.ViewStory)
		storyGourp.POST("/update", server.UpdateStory)
	}
	imageGourp := r.Group("image")
	{
		imageGourp.POST("/upload", server.UploadImage)
		imageGourp.POST("/delete", server.DeleteImage)
	}
	syncGourp := r.Group("sync")
	{
		syncGourp.POST("/jianguo/connect", server.ConnectToJianGuoYun)
		syncGourp.POST("/jianguo/upload", server.UploadToJianGuoYun)
		syncGourp.POST("/jianguo/download", server.DownloadFromJianGuoYun)
		syncGourp.POST("/jianguo/sync", server.DeleteImage)
	}

	server.Router = r
	return server
}
