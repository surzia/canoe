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

func NewImage(sid, filename string) *Image {
	return &Image{
		Sid:      sid,
		Filename: filename,
	}
}

type CreateImageRequest struct {
	Sid      string `json:"sid"`
	Filename string `json:"filename"`
}
