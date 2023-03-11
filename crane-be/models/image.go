package models

import "gorm.io/gorm"

type DeleteImageRequest struct {
	ImageUrl string `json:"url"`
}

type Image struct {
	gorm.Model
	Sid      string `json:"sid"`
	Filename string `json:"filename"`
}
