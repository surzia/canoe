package utils

import (
	"papercrane/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// InitDB initialize database with schema when server starts
func InitDB(path string) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(path), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&models.Story{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&models.Image{})
	if err != nil {
		panic(err)
	}
	return db
}

func MockData(path string, n int) {
	db := InitDB(path)
	for i := 0; i < n; i++ {
		story := &models.Story{
			Content: RandomStory(50),
		}
		ret := db.Create(story)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}
}
