package models

type DeleteImageRequest struct {
	ImageUrl string `json:"url"`
}

type Image struct {
	Sid      string `json:"sid"`
	Filename string `json:"filename"`
}

type CreateImageRequest struct {
	Sid      string `json:"sid"`
	Filename string `json:"filename"`
}
