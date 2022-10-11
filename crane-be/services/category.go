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

func (c *CategoryService) CreateCategory(req *models.CreateCategoryRequest) *models.CategoryThumbnail {
	categoryDao := dao.NewCategoryDao(c.db)
	category := categoryDao.CreateCategory(req)
	thumbnail := &models.CategoryThumbnail{
		Name:    category.CategoryName,
		Created: category.CreatedAt.Local().Format("2006-01-02 15:04:05"),
	}
	return thumbnail
}

func (c *CategoryService) QueryCategories() []models.CategoryThumbnail {
	categoryDao := dao.NewCategoryDao(c.db)
	categories := categoryDao.QueryCategories()
	return categories
}

func (c *CategoryService) IsExistCategory(id int) bool {
	if id == 0 {
		return true
	}
	categoryDao := dao.NewCategoryDao(c.db)
	exist := categoryDao.IsExistCategory(id)
	return exist
}
