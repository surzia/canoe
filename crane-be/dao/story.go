package dao

import (
	"papercrane/models"

	"gorm.io/gorm"
)

type StoryDao struct {
	db *gorm.DB
}

func NewStoryDao(db *gorm.DB) *StoryDao {
	storyDao := &StoryDao{db: db}

	return storyDao
}

func (s *StoryDao) CreateStory(req *models.CreateStoryRequest) *models.Story {
	story := &models.Story{
		Content:    req.Content,
		CategoryId: 0,
	}

	ret := s.db.Create(story)
	if ret.Error != nil {
		panic(ret.Error)
	}

	return story
}

func (s *StoryDao) QueryStories(page, size int) []models.Story {
	limit := size
	offset := (page - 1) * size

	ret := []models.Story{}
	s.db.Offset(offset).Limit(limit).Find(&ret)
	return ret
}

func (s *StoryDao) ViewStory(id int) *models.Story {
	var story models.Story
	s.db.First(&story, id)

	return &story
}

func (s *StoryDao) UpdateStory(req *models.UpdateStoryRequest) *models.Story {
	story := s.ViewStory(req.Id)

	s.db.Model(story).Update("content", req.Content)
	return story
}
