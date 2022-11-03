package services

import (
	"fmt"
	"strings"

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

func (s *StoryService) SearchStory(req *models.SearchStoryRequest) []models.SearchStoryResult {
	var ret []models.SearchStoryResult
	offset := 9

	storyDao := dao.NewStoryDao(s.db)
	stories := storyDao.SearchStory(req)
	for _, story := range stories {
		index := strings.Index(story.Content, req.Query)
		start := 0
		end := len(story.Content) - 1
		if index-offset > start {
			start = index - offset
		}
		if index+offset < end {
			end = index + offset
		}
		hit := strings.Replace(story.Content[start:end], req.Query, fmt.Sprintf("<strong style=\"color:#FF8C00\">%s</strong>", req.Query), -1)
		text := strings.Replace(story.Content, req.Query, fmt.Sprintf("<strong style=\"color:#FF8C00\">%s</strong>", req.Query), -1)
		ret = append(ret, models.SearchStoryResult{
			ID:   story.Id,
			Hit:  hit,
			Text: text,
		})
	}
	return ret
}
