package db

import (
	"fmt"

	"storyx/internal/story"
)

type StoryDB struct {
	*PGDatabase
}

func (s *StoryDB) Create(record interface{}) error {
	r, ok := record.(story.Story)
	if !ok {
		return fmt.Errorf("invalid record")
	}

	tx := s.Conn.Table("story").Create(&r)
	return tx.Error
}

func (s *StoryDB) Update(record interface{}) error {
	r, ok := record.(story.Story)
	if !ok {
		return fmt.Errorf("invalid record")
	}

	tx := s.Conn.Table("story").Save(&r)
	return tx.Error
}

func (s *StoryDB) Read(record interface{}) (interface{}, error) {
	r, ok := record.(story.Story)
	if !ok {
		return nil, fmt.Errorf("invalid record")
	}

	var res story.Story
	tx := s.Conn.Table("story").Where(&r).First(&res)
	return res, tx.Error
}

func (s *StoryDB) Delete(record interface{}) error {
	r, ok := record.(story.Story)
	if !ok {
		return fmt.Errorf("invalid record")
	}

	tx := s.Conn.Table("story").Unscoped().Delete(&r)
	return tx.Error
}
