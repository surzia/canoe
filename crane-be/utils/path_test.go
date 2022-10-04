package utils

import (
	"fmt"
	"testing"
)

func TestGetCurrentDirectory(t *testing.T) {
	dir := GetCurrentDirectory()
	t.Logf(fmt.Sprintf("current path: %s", dir))
}

func TestWorkDir(t *testing.T) {
	dir := WorkDir()
	t.Logf(fmt.Sprintf("work path: %s", dir))
}

func TestReactStaticFilePath(t *testing.T) {
	dir := ReactStaticFilePath()
	t.Logf(fmt.Sprintf("react static file path: %s", dir))
}
