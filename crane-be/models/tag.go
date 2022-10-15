package models

import "gorm.io/gorm"

type Tag struct {
	gorm.Model
	Id      int    `json:"id"`
	TagName string `json:"tag_name"`
}

type CreateTagRequest struct {
	TagName string `json:"name"`
}

type TagIDListRequest struct {
	Tags []int `json:"tags"`
}

type TagsListRequest struct {
	Tags []string `json:"ids"`
}
