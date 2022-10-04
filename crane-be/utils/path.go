package utils

import (
	"os"
	"path"
	"strings"
)

func substr(s string, pos, length int) string {
	runes := []rune(s)
	l := pos + length
	if l > len(runes) {
		l = len(runes)
	}
	return string(runes[pos:l])
}

func GetCurrentDirectory() string {
	dir, _ := os.Getwd()
	return dir
}

func WorkDir() string {
	return substr(GetCurrentDirectory(), 0, strings.LastIndex(GetCurrentDirectory(), "/"))
}

func ReactStaticFilePath() string {
	frontendPath := path.Join(WorkDir(), "crane-fe")
	return path.Join(frontendPath, "build")
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
