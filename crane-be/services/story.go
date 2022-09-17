package services

import (
	"papercrane/dao"
	"papercrane/models"

	"gorm.io/gorm"
)

type StoryService struct {
	db *gorm.DB
}

func NewStoryService(db *gorm.DB) *StoryService {
	storyService := &StoryService{db: db}

	return storyService
}

func (s *StoryService) CreateStory(req *models.CreateStoryRequest) *models.Story {
	storyDao := dao.NewStoryDao(s.db)
	story := storyDao.CreateStoryFromRequest(req)
	return story
}
