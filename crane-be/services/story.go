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

func (s *StoryService) CountStories(keyword string) int64 {
	storyDao := dao.NewStoryDao(s.db)
	count := storyDao.CountStories(keyword)
	return count
}

func (s *StoryService) QueryStories(page, size int, sort, word string) []models.StoryFeed {
	storyDao := dao.NewStoryDao(s.db)
	imageDao := dao.NewImageDao(s.db)
	feeds := []models.StoryFeed{}
	stories := storyDao.QueryStories(page, size, sort, word)
	for _, story := range stories {
		images := imageDao.QueryImagesByStoryId(story.Sid)
		feeds = append(feeds, models.StoryFeed{
			Sid:       story.Sid,
			CreatedAt: story.CreatedAt,
			UpdatedAt: story.UpdatedAt,
			Content:   story.Content,
			Images:    images,
		})
	}
	return feeds
}

func (s *StoryService) ViewStory(id string) *models.Story {
	storyDao := dao.NewStoryDao(s.db)
	story := storyDao.ViewStory(id)
	return story
}

func (s *StoryService) UpdateStory(req *models.UpdateStoryRequest) *models.Story {
	storyDao := dao.NewStoryDao(s.db)
	story := storyDao.UpdateStory(req)
	return story
}

func (s *StoryService) GetAllStoryIDList() []models.Story {
	storyDao := dao.NewStoryDao(s.db)
	stories := storyDao.GetAllStoryIDList()
	return stories
}

func (s *StoryService) HighlightedDays(month string) []int {
	storyDao := dao.NewStoryDao(s.db)
	days := storyDao.HighlightedDays(month)
	return days
}

func (s *StoryService) Statistics() []models.StoryStatistics {
	storyDao := dao.NewStoryDao(s.db)
	statistics := storyDao.Statistics()
	return statistics
}

func (s *StoryService) DeleteStory() {
	storyDao := dao.NewStoryDao(s.db)
	storyDao.DeleteStory()
}
