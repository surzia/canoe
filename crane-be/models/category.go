package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Id           int    `json:"id"`
	CategoryName string `json:"category_name"`
}

type CreateCategoryRequest struct {
	Name string `json:"name"`
}
