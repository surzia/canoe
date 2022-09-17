package utils

import (
	"github.com/surzia/crane-be/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// InitDB initialize database with schema when server starts
func InitDB(path string) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(path), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&models.Story{}, &models.Category{}, &models.Tag{})
	if err != nil {
		panic(err)
	}
	return db
}
