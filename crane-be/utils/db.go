package utils

import (
	"papercrane/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// InitDB initialize database with schema when server starts
func InitDB(path string) *gorm.DB {
	db, _ := gorm.Open(sqlite.Open(path), &gorm.Config{})

	db.AutoMigrate(&models.Story{})
	db.AutoMigrate(&models.Paragraph{})
	db.AutoMigrate(&models.Sync{})
	return db
}

func MockData(path string, n int) {
	db := InitDB(path)
	for i := 0; i < n; i++ {
		story := &models.Story{
			// Content: RandomStory(50),
		}
		db.Create(story)
	}
}
