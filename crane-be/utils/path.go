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
