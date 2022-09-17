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

func (s *StoryDao) CreateStoryFromRequest(req *models.CreateStoryRequest) *models.Story {
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
