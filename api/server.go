package api

import (
	"log"
	"net/http"

	"golang.org/x/net/webdav"
)

func Run() {
	// 创建自定义的 WebDAV 文件系统
	fs := &LocalFileSystem{
		RootDir: ".",
	}

	log.Fatal(http.ListenAndServe(":8080", &webdav.Handler{
		FileSystem: fs,
		LockSystem: webdav.NewMemLS(),
	}))
}
