package services

import (
	"sort"

	"papercrane/dao"
	"papercrane/models"
	"papercrane/utils"

	"gorm.io/gorm"
)

type StoryService struct {
	db *gorm.DB
}

func NewStoryService(db *gorm.DB) *StoryService {
	storyService := &StoryService{db: db}

	return storyService
}

func (s *StoryService) CreateStory(req *models.StoryReq) {
	if req.Sid == "" {
		req.Sid = utils.GenerateUUID()
	}
	storyDao := dao.NewStoryDao(s.db)
	storyDao.CreateStory(req.Sid)
}

func (s *StoryService) CountStories() int64 {
	storyDao := dao.NewStoryDao(s.db)
	count := storyDao.CountStories()
	return count
}

func (s *StoryService) QueryFromAllStories(page, size int, sort string) []models.StoryFeed {
	storyDao := dao.NewStoryDao(s.db)
	stories := storyDao.QueryFromAllStories(page, size, sort)
	return stories
}

func (s *StoryService) QueryFromHitStories(page, size int, sortType string, hitStoryIDs []string) []models.StoryFeed {
	var storiesCmp models.StoryCmp
	for _, hitID := range hitStoryIDs {
		story, _ := s.ViewStory(hitID)
		storiesCmp = append(storiesCmp, story)
	}
	if sortType == "desc" {
		sort.Sort(sort.Reverse(storiesCmp))
	} else {
		sort.Sort(storiesCmp)
	}
	limit := size
	offset := (page - 1) * size

	var ret []models.StoryFeed
	for _, v := range storiesCmp {
		ret = append(ret, models.StoryFeed{
			Sid:       v.Sid,
			CreatedAt: v.CreatedAt,
			UpdatedAt: v.UpdatedAt,
		})
	}
	return ret[offset : offset+limit]
}

func (s *StoryService) ViewStory(id string) (*models.Story, error) {
	storyDao := dao.NewStoryDao(s.db)
	story, err := storyDao.ViewStory(id)
	return story, err
}

func (s *StoryService) UpdateStory(req *models.StoryFeed) {
	storyDao := dao.NewStoryDao(s.db)
	storyDao.UpdateStory(req.Sid)
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
