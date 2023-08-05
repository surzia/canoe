package api

import (
	"context"
	"os"
	"path/filepath"

	"golang.org/x/net/webdav"
)

type LocalFileSystem struct {
	RootDir string // 根目录
}

func (fs *LocalFileSystem) Mkdir(_ context.Context, name string, perm os.FileMode) error {
	fullPath := filepath.Join(fs.RootDir, name)
	return os.Mkdir(fullPath, perm)
}

func (fs *LocalFileSystem) OpenFile(_ context.Context, name string, flag int, perm os.FileMode) (webdav.File, error) {
	fullPath := filepath.Join(fs.RootDir, name)
	return os.OpenFile(fullPath, flag, perm)
}

func (fs *LocalFileSystem) RemoveAll(_ context.Context, name string) error {
	fullPath := filepath.Join(fs.RootDir, name)
	return os.RemoveAll(fullPath)
}

func (fs *LocalFileSystem) Rename(_ context.Context, oldName, newName string) error {
	oldPath := filepath.Join(fs.RootDir, oldName)
	newPath := filepath.Join(fs.RootDir, newName)
	return os.Rename(oldPath, newPath)
}

func (fs *LocalFileSystem) Stat(_ context.Context, name string) (os.FileInfo, error) {
	fullPath := filepath.Join(fs.RootDir, name)
	return os.Stat(fullPath)
}
