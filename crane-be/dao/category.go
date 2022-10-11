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

func (c *CategoryDao) QueryCategories() []models.CategoryThumbnail {
	var categories []models.Category
	var categoryThumbnails []models.CategoryThumbnail

	result := c.db.Find(&categories)
	if result.Error != nil {
		panic(result.Error)
	}

	for _, category := range categories {
		thumbnail := models.CategoryThumbnail{
			Name:    category.CategoryName,
			Created: category.CreatedAt.Local().Format("2006-01-02 15:04:05"),
		}
		categoryThumbnails = append(categoryThumbnails, thumbnail)
	}

	return categoryThumbnails
}

func (c *CategoryDao) IsExistCategory(id int) bool {
	var category models.Category

	result := c.db.Where("id = ?", id).Find(&category)
	return result.RowsAffected != 0
}
