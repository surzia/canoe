package dao

import (
	"papercrane/models"

	"gorm.io/gorm"
)

type CategoryDao struct {
	db *gorm.DB
}

func NewCategoryDao(db *gorm.DB) *CategoryDao {
	categoryDao := &CategoryDao{db: db}

	return categoryDao
}

func (c *CategoryDao) CreateCategory(req *models.CreateCategoryRequest) *models.Category {
	category := &models.Category{
		CategoryName: req.Name,
	}

	ret := c.db.Create(category)
	if ret.Error != nil {
		panic(ret.Error)
	}

	return category
}
