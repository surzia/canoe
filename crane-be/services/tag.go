package services

import (
	"papercrane/dao"
	"papercrane/models"

	"gorm.io/gorm"
)

type TagService struct {
	db *gorm.DB
}

func NewTagService(db *gorm.DB) *TagService {
	tagService := &TagService{db: db}

	return tagService
}

func (t *TagService) CreateTag(req *models.CreateTagRequest) *models.Tag {
	tagDao := dao.NewTagDao(t.db)
	tag := tagDao.CreateTag(req)
	return tag
}

func (t *TagService) QueryTags() []models.Tag {
	tagDao := dao.NewTagDao(t.db)
	tags := tagDao.QueryTags()
	return tags
}
