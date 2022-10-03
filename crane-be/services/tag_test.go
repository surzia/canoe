package services

import (
	"reflect"
	"testing"

	"papercrane/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestNewTagService(t *testing.T) {
	defer func() {
		err := recover()
		if err != nil {
			t.Errorf("func NewTagService failed, error %v", err)
		}
	}()

	db, _ := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	srv := NewTagService(db)

	if srv == nil {
		t.Error("nil result")
	}
}

func TestCreateTag(t *testing.T) {
	mockReq := &models.CreateTagRequest{TagName: "testTag"}
	expectTag := &models.Tag{TagName: "testTag"}

	db, _ := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	srv := NewTagService(db)

	tag := srv.CreateTag(mockReq)
	if reflect.DeepEqual(tag, expectTag) {
		t.Errorf("expected %v, but got %v", expectTag, tag)
	}
}
