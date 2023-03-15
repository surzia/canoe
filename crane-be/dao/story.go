package dao

import (
	"fmt"
	"strconv"
	"strings"

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
	story := models.NewStory(req.Sid, req.Content, &req.HasImage)

	ret := s.db.Create(story)
	if ret.Error != nil {
		panic(ret.Error)
	}

	return story
}

func (s *StoryDao) CountStories(keyword string) int64 {
	var count int64
	if keyword == "" {
		s.db.Find(&models.Story{}).Count(&count)
	} else {
		s.db.Find(&models.Story{}).Where("content LIKE ?", "%"+keyword+"%").Count(&count)
	}
	return count
}

func (s *StoryDao) QueryStories(page, size int, sort, word string) []models.StoryThumbnail {
	limit := size
	offset := (page - 1) * size

	stories := []models.Story{}
	storiesThumbnail := []models.StoryThumbnail{}
	if word == "" {
		// 查询所有
		s.db.Offset(offset).Limit(limit).Order(fmt.Sprintf("created_at %s", sort)).Find(&stories)
	} else {
		// 搜索
		s.db.Where("content LIKE ?", "%"+word+"%").Offset(offset).Limit(limit).Find(&stories)
	}
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

func (s *StoryDao) GetAllStoryIDList() []models.Story {
	var stories []models.Story
	s.db.Find(&stories)
	return stories
}

func (s *StoryDao) HighlightedDays(date string) []int {
	// date:2023-03
	days := []int{}
	var leftYear, leftMonth, rightYear, rightMonth int
	ret := strings.Split(date, "-")
	leftYear, _ = strconv.Atoi(ret[0])
	leftMonth, _ = strconv.Atoi(ret[1])
	if leftMonth == 1 {
		rightMonth = 12
		rightYear = leftYear - 1
	} else {
		rightMonth = leftMonth + 1
		rightYear = leftYear
	}
	var highlightedDays []models.Story
	var left = fmt.Sprintf("%04d-%02d-01T00:00:00Z", leftYear, leftMonth)
	var right = fmt.Sprintf("%04d-%02d-01T00:00:00Z", rightYear, rightMonth)
	s.db.Where("created_at > ? AND created_at < ?", left, right).Find(&highlightedDays)
	for _, highlightedDay := range highlightedDays {
		days = append(days, highlightedDay.CreatedAt.Day())
	}

	return days
}

func (s *StoryDao) Statistics() []models.StoryStatistics {
	var statistics []models.StoryStatistics

	var tmp = make(map[int]int)
	var stories []models.Story
	s.db.Find(&stories)
	for _, story := range stories {
		if cnt, ok := tmp[story.CreatedAt.Year()]; ok {
			tmp[story.CreatedAt.Year()] = cnt + 1
		} else {
			tmp[story.CreatedAt.Year()] = 1
		}
	}

	for k, v := range tmp {
		statistics = append(statistics, models.StoryStatistics{
			Year:  k,
			Count: v,
		})
	}

	return statistics
}
