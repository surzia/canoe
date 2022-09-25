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
	story := storyDao.CreateStory(req)
	return story
}

func (s *StoryService) CountStories() int64 {
	storyDao := dao.NewStoryDao(s.db)
	count := storyDao.CountStories()
	return count
}

func (s *StoryService) QueryStories(page, size int) []models.StoryThumbnail {
	storyDao := dao.NewStoryDao(s.db)
	stories := storyDao.QueryStories(page, size)
	return stories
}

func (s *StoryService) ViewStory(id int) *models.Story {
	storyDao := dao.NewStoryDao(s.db)
	story := storyDao.ViewStory(id)
	return story
}

func (s *StoryService) UpdateStory(req *models.UpdateStoryRequest) *models.Story {
	storyDao := dao.NewStoryDao(s.db)
	story := storyDao.UpdateStory(req)
	return story
}
