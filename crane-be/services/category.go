package services

import (
	"papercrane/dao"
	"papercrane/models"

	"gorm.io/gorm"
)

type CategoryService struct {
	db *gorm.DB
}

func NewCategoryService(db *gorm.DB) *CategoryService {
	categoryService := &CategoryService{db: db}

	return categoryService
}

func (c *CategoryService) CreateCategory(req *models.CreateCategoryRequest) *models.Category {
	categoryDao := dao.NewCategoryDao(c.db)
	category := categoryDao.CreateCategory(req)
	return category
}

func (c *CategoryService) QueryCategories() []models.Category {
	categoryDao := dao.NewCategoryDao(c.db)
	categories := categoryDao.QueryCategories()
	return categories
}
