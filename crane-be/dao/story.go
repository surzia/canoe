package dao

import (
	"papercrane/models"
	"papercrane/utils"

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

func (s *StoryDao) QueryStories(page, size int) []models.StoryThumbnail {
	limit := size
	offset := (page - 1) * size

	stories := []models.Story{}
	storiesThumbnail := []models.StoryThumbnail{}
	s.db.Offset(offset).Limit(limit).Find(&stories)
	for _, story := range stories {
		thumbnail := models.StoryThumbnail{
			CreatedAt: story.CreatedAt.Local(),
			Content:   utils.StringFormat100(story.Content),
		}
		storiesThumbnail = append(storiesThumbnail, thumbnail)
	}
	return storiesThumbnail
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
