package models

import "gorm.io/gorm"

type Story struct {
	gorm.Model
	Id         int      `json:"id"`
	Content    string   `json:"content"`
	CategoryId int      `json:"category_id"`
	Category   Category `json:"category" gorm:"foreignkey:CategoryId"`
	Tags       []Tag    `gorm:"many2many:story_tag" json:"tag"`
}

type CreateStoryRequest struct {
	Content string `json:"content"`
}

type UpdateStoryRequest struct {
	Id      int    `json:"id"`
	Content string `json:"content"`
}
