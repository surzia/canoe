package models

import (
	"time"

	"gorm.io/gorm"
)

type Story struct {
	gorm.Model
	Id         int      `json:"id"`
	Content    string   `json:"content"`
	CategoryId int      `json:"category_id"`
	Category   Category `json:"category" gorm:"foreignkey:CategoryId"`
	Tags       []Tag    `gorm:"many2many:story_tag" json:"tag"`
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
	Hit  string `json:"hit"`
	Text string `json:"text"`
}
