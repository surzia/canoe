package models

import (
	"time"

	"gorm.io/gorm"
)

type Story struct {
	gorm.Model
	Sid      string `json:"sid"`
	Content  string `json:"content"`
	HasImage *bool  `json:"image" gorm:"not null;default:false"`
}

func NewStory(sid, content string, flag *bool) *Story {
	return &Story{
		Sid:      sid,
		Content:  content,
		HasImage: flag,
	}
}

type StoryThumbnail struct {
	Sid       string    `json:"sid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Content   string    `json:"content"`
}

type StoryFeed struct {
	Sid       string    `json:"sid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Content   string    `json:"content"`
	Images    []string  `json:"images"`
}

type CreateStoryRequest struct {
	Sid      string `json:"sid"`
	Content  string `json:"content"`
	HasImage bool   `json:"image"`
}

type UpdateStoryRequest struct {
	Sid      string `json:"sid"`
	Content  string `json:"content"`
	HasImage bool   `json:"image"`
}

type StoryStatistics struct {
	Year  int `json:"year"`
	Count int `json:"count"`
}
