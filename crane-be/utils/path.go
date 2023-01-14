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
	u, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	dbDir := path.Join(u, ".crane")
	if !isExist(dbDir) {
		err = os.MkdirAll(dbDir, os.ModePerm)
		if err != nil {
			panic(err)
		}
	}

	return path.Join(dbDir, "papercrane.db")
}

func StaticPath() string {
	u, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	dbDir := path.Join(u, ".crane")
	if !isExist(dbDir) {
		err = os.MkdirAll(dbDir, os.ModePerm)
		if err != nil {
			panic(err)
		}
	}
	return path.Join(dbDir, "images")
}
