package api

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"papercrane/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) UploadImage(c *gin.Context) {
	file, err := c.FormFile("images")
	filename := strings.Split(file.Filename, ".")
	file.Filename = fmt.Sprintf("%d.%s", time.Now().Unix(), filename[len(filename)-1])
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ERROR(err))
		return
	}

	err = c.SaveUploadedFile(file, filepath.Join(s.staticFilePath, file.Filename))
	if err != nil {
		c.JSON(http.StatusInternalServerError, utils.ERROR(fmt.Errorf("save image failed, err: %v", err)))
		return
	}
	c.JSON(http.StatusOK, utils.OK(file))
}
