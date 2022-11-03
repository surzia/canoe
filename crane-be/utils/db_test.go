package utils

import (
	"testing"

	"papercrane/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var conn *gorm.DB

func TestInitDatabase(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	if err != nil {
		t.Errorf("database init error: %v", err)
	}

	err = db.AutoMigrate(&models.Story{})
	if err != nil {
		t.Errorf("database init error: %v", err)
	}
}

func TestConnectDatabase(t *testing.T) {
	db, err := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	if err != nil {
		t.Errorf("cannot connect to database, error: %v", err)
	}

	conn = db
}

func TestMockData(t *testing.T) {
	defer func() {
		err := recover()
		if err != nil {
			t.Errorf("mock data failed, error %v", err)
		}
	}()

	MockData(DBPath(), 20)
}
