package dao

import (
	"fmt"
	"strconv"
	"strings"
	"time"

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

// CreateStory create story id in story table. Meanwhile, create story's paragraphs
// in paragraph table
func (s *StoryDao) CreateStory(storyID string) {
	story := &models.Story{
		Sid: storyID,
	}

	s.db.Create(story)
}

func (s *StoryDao) CountStories() int64 {
	var count int64
	s.db.Find(&models.Story{}).Count(&count)
	return count
}

func (s *StoryDao) QueryFromAllStories(page, size int, sort string) []models.StoryFeed {
	limit := size
	offset := (page - 1) * size
	stories := []models.Story{}
	ret := []models.StoryFeed{}
	s.db.Offset(offset).Limit(limit).Order(fmt.Sprintf("created_at %s", sort)).Find(&stories)
	for _, story := range stories {
		ret = append(ret, models.StoryFeed{
			Sid:       story.Sid,
			CreatedAt: story.CreatedAt,
			UpdatedAt: story.UpdatedAt,
		})
	}
	return ret
}

func (s *StoryDao) ViewStory(id string) (*models.Story, error) {
	var story models.Story
	if err := s.db.Where("sid = ?", id).First(&story).Error; err != nil {
		return nil, err
	}

	return &story, nil
}

func (s *StoryDao) UpdateStory(storyID string) {
	s.db.Model(&models.Story{}).Where("sid = ?", storyID).Update("updated_at", time.Now())
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
	if leftMonth == 12 {
		rightMonth = 1
		rightYear = leftYear + 1
	} else {
		rightMonth = leftMonth + 1
		rightYear = leftYear
	}
	var highlightedDays []models.Story
	var left = fmt.Sprintf("%04d-%02d-01T00:00:00Z", leftYear, leftMonth)
	var right = fmt.Sprintf("%04d-%02d-01T00:00:00Z", rightYear, rightMonth)
	s.db.Where("created_at >= ? AND created_at < ?", left, right).Find(&highlightedDays)
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

func (s *StoryDao) DeleteStory() {
	s.db.Model(&models.Story{}).Where("1=1").Unscoped().Delete(&models.Story{})
}
