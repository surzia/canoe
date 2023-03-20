package services

import (
	"testing"

	"papercrane/models"
	"papercrane/utils"

	"gorm.io/gorm"
)

func newStoryService(t *testing.T, db *gorm.DB) *StoryService {
	service := NewStoryService(db)
	if service == nil {
		t.Error("failed to init story service")
	}

	return service
}

func TestCreateStory(t *testing.T) {
	conn := utils.InitDB("../test.db")
	svc := newStoryService(t, conn)

	sid := "12345678"

	var req = models.StoryReq{
		Sid: sid,
	}

	svc.CreateStory(&req)
	conn.Where("1 = 1").Delete(&models.Story{})
}
