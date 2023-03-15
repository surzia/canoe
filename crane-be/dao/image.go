package dao

import (
	"papercrane/models"

	"gorm.io/gorm"
)

type ImageDao struct {
	db *gorm.DB
}

func NewImageDao(db *gorm.DB) *ImageDao {
	imageDao := &ImageDao{db: db}

	return imageDao
}

func (i *ImageDao) CreateImage(req *models.CreateImageRequest) *models.Image {
	image := models.NewImage(req.Sid, req.Filename)

	ret := i.db.Create(image)
	if ret.Error != nil {
		panic(ret.Error)
	}

	return image
}

func (i *ImageDao) QueryImagesByStoryId(id string) []string {
	images := []models.Image{}
	i.db.Where("sid = ?", id).Find(&images)

	ret := []string{}
	for _, img := range images {
		ret = append(ret, img.Filename)
	}
	return ret
}

func (i *ImageDao) ImageList() []models.Image {
	var images []models.Image
	i.db.Find(&images)
	return images
}
