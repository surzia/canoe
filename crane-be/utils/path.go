package utils

import (
	"os"
	"path"
	"path/filepath"
)

func getCurrentDirectory() string {
	dir, _ := os.Getwd()
	return dir
}

func ReactStaticFilePath() string {
	frontendPath := filepath.Join(getCurrentDirectory(), "crane-fe")
	return filepath.Join(frontendPath, "build")
}

func isExist(path string) bool {
	_, err := os.Stat(path)
	if err != nil {
		return os.IsExist(err)
	}

	return true

}

func DBPath() string {
	u, _ := os.UserHomeDir()

	dbDir := path.Join(u, ".crane")
	os.MkdirAll(dbDir, os.ModePerm)

	return path.Join(dbDir, "papercrane.db")
}

func StaticPath() string {
	u, _ := os.UserHomeDir()

	dbDir := path.Join(u, ".crane")
	os.MkdirAll(dbDir, os.ModePerm)

	imageDir := path.Join(dbDir, "images")
	os.MkdirAll(imageDir, os.ModePerm)
	return imageDir
}
