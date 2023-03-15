package services

import (
	"papercrane/dao"
	"papercrane/models"

	"gorm.io/gorm"
)

type ImageService struct {
	db *gorm.DB
}

func NewImageService(db *gorm.DB) *ImageService {
	imageService := &ImageService{db: db}

	return imageService
}

func (i *ImageService) ImageList() []models.Image {
	imageDao := dao.NewImageDao(i.db)
	imageList := imageDao.ImageList()
	return imageList
}
