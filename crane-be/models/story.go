package models

import (
	"time"

	"gorm.io/gorm"
)

type Story struct {
	gorm.Model
	Id      int    `json:"id"`
	Content string `json:"content"`
}

type StoryThumbnail struct {
	Id        int       `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	Content   string    `json:"content"`
}

type CreateStoryRequest struct {
	Content string `json:"content"`
}

type UpdateStoryRequest struct {
	Id      int    `json:"id"`
	Content string `json:"content"`
}

type SearchStoryRequest struct {
	Query string `json:"query"`
}

type SearchStoryResult struct {
	ID   int    `json:"id"`
	Hit  string `json:"hit"`
	Text string `json:"text"`
}
