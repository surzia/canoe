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

type StoryThumbnail struct {
	Sid       string    `json:"sid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Content   string    `json:"content"`
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

type SearchStoryRequest struct {
	Query string `json:"query"`
}

type SearchStoryResult struct {
	Sid  string `json:"sid"`
	Hit  string `json:"hit"`
	Text string `json:"text"`
}
