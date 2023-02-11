package dao

import (
	"fmt"

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
		Sid:      req.Sid,
		Content:  req.Content,
		HasImage: &req.HasImage,
	}

	ret := s.db.Create(story)
	if ret.Error != nil {
		panic(ret.Error)
	}

	return story
}

func (s *StoryDao) CountStories() int64 {
	var count int64
	s.db.Find(&models.Story{}).Count(&count)
	return count
}

func (s *StoryDao) QueryStories(page, size int, sort string) []models.StoryThumbnail {
	limit := size
	offset := (page - 1) * size

	stories := []models.Story{}
	storiesThumbnail := []models.StoryThumbnail{}
	s.db.Offset(offset).Limit(limit).Order(fmt.Sprintf("created_at %s", sort)).Find(&stories)
	for _, story := range stories {
		thumbnail := models.StoryThumbnail{
			Sid:       story.Sid,
			CreatedAt: story.CreatedAt.Local(),
			UpdatedAt: story.UpdatedAt.Local(),
			Content:   utils.StringFormat(story.Content),
		}
		storiesThumbnail = append(storiesThumbnail, thumbnail)
	}
	return storiesThumbnail
}

func (s *StoryDao) ViewStory(id string) *models.Story {
	var story models.Story
	s.db.Where("sid = ?", id).First(&story)

	return &story
}

func (s *StoryDao) UpdateStory(req *models.UpdateStoryRequest) *models.Story {
	story := s.ViewStory(req.Sid)

	s.db.Model(story).Update("content", req.Content).Update("has_image", req.HasImage)
	return story
}

func (s *StoryDao) SearchStory(req *models.SearchStoryRequest) []models.Story {
	var ret []models.Story

	s.db.Where("content LIKE ?", "%"+req.Query+"%").Limit(8).Find(&ret)

	return ret
}
