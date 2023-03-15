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
	content := "test create story"
	hasImage := false

	var req = models.CreateStoryRequest{
		Sid:      sid,
		Content:  content,
		HasImage: hasImage,
	}

	var expect = models.Story{
		Sid:      sid,
		Content:  content,
		HasImage: &hasImage,
	}

	story := svc.CreateStory(&req)
	if story.Sid != expect.Sid || story.Content != expect.Content || *story.HasImage || *expect.HasImage {
		t.Errorf("error story %v, expected story %v", story, expect)
	}
	conn.Where("1 = 1").Delete(&models.Story{})
}
