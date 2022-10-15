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

func (t *TagService) QueryTagByID(id int) models.Tag {
	tagDao := dao.NewTagDao(t.db)
	tag := tagDao.QueryTagById(id)
	return tag
}

func (t *TagService) QueryTagsByIDList(req models.TagIDListRequest) []string {
	var ret []string
	for _, id := range req.Tags {
		tag := t.QueryTagByID(id)
		ret = append(ret, tag.TagName)
	}

	return ret
}

func (t *TagService) QueryIDsByTagList(req models.TagsListRequest) []int {
	tagDao := dao.NewTagDao(t.db)
	ids := tagDao.QueryIDsByTagList(req)
	return ids
}

func (t *TagService) IsExistTag(id int) bool {
	tagDao := dao.NewTagDao(t.db)
	exist := tagDao.IsExistTag(id)
	return exist
}

func (t *TagService) AreExistTags(tags []int) bool {
	for i := 0; i < len(tags); i++ {
		if !t.IsExistTag(tags[i]) {
			return false
		}
	}
	return true
}
