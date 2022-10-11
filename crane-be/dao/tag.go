package dao

import (
	"papercrane/models"

	"gorm.io/gorm"
)

type TagDao struct {
	db *gorm.DB
}

func NewTagDao(db *gorm.DB) *TagDao {
	tagDao := &TagDao{db: db}

	return tagDao
}

func (t *TagDao) CreateTag(req *models.CreateTagRequest) *models.Tag {
	tag := &models.Tag{
		TagName: req.TagName,
	}

	ret := t.db.Create(tag)
	if ret.Error != nil {
		panic(ret.Error)
	}

	return tag
}

func (t *TagDao) QueryTags() []models.Tag {
	var tags []models.Tag

	result := t.db.Find(&tags)
	if result.Error != nil {
		panic(result.Error)
	}

	return tags
}

func (t *TagDao) IsExistTag(id int) bool {
	var tag models.Tag

	result := t.db.Where("id = ?", id).Find(&tag)
	return result.RowsAffected != 0
}

func (t *TagDao) QueryTagById(id int) models.Tag {
	var tag models.Tag
	t.db.First(&tag, id)

	return tag
}
