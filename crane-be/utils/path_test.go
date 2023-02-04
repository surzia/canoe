package utils

import (
	"path"
	"strings"
	"testing"
)

func TestGetCurrentDirectory(t *testing.T) {
	dir := getCurrentDirectory()
	if !strings.HasSuffix(dir, "/papercrane/crane-be/utils") {
		t.Errorf("current dir %s does not end with /papercrane/utils", dir)
	}
}

func TestReactStaticFilePath(t *testing.T) {
	reactDir := ReactStaticFilePath()
	if !strings.HasSuffix(reactDir, "/crane-fe/build") {
		t.Errorf("react staticfile path %s does not end with /crane-fe/build", reactDir)
	}
}

func TestIsExist(t *testing.T) {
	dir := getCurrentDirectory()
	curFile := path.Join(dir, "path_test.go")
	exist := isExist(curFile)
	if !exist {
		t.Errorf("current file %s should exist", curFile)
	}

	fakeFile := path.Join(dir, "path_test_fake.go")
	exist = isExist(fakeFile)
	if exist {
		t.Errorf("fake file %s should not exist", fakeFile)
	}
}

func TestDBPath(t *testing.T) {
	dbPath := DBPath()
	if !strings.HasSuffix(dbPath, "/.crane/papercrane.db") {
		t.Errorf("db file path %s does not end with /.crane/papercrane.db", dbPath)
	}
}

func TestStaticPath(t *testing.T) {
	staticPath := StaticPath()
	if !strings.HasSuffix(staticPath, "/.crane/images") {
		t.Errorf("db file path %s does not end with /.crane/images", staticPath)
	}
}
