package models

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

const (
	TextBlock = iota + 1
	HeaderBlock
	ImageBlock
)

type Story struct {
	gorm.Model
	Sid string `json:"sid"`
}

type StoryReq struct {
	Sid       string         `json:"sid"`
	Paragraph []ParagraphReq `json:"paragraph"`
}

type StoryCmp []*Story

func (s StoryCmp) Len() int {
	return len(s)
}

func (s StoryCmp) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

func (s StoryCmp) Less(i, j int) bool {
	return s[i].CreatedAt.After(s[j].CreatedAt)
}

type StoryFeed struct {
	Sid       string      `json:"sid"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
	Content   []Paragraph `json:"content"`
}

type StoryFeedLite struct {
	Sid       string    `json:"sid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Content   string    `json:"content"`
	Image     []string  `json:"images"`
}

func (s *StoryFeed) Lite() *StoryFeedLite {
	ret := &StoryFeedLite{
		Sid:       s.Sid,
		CreatedAt: s.CreatedAt,
		UpdatedAt: s.UpdatedAt,
		Image:     []string{},
	}

	for _, p := range s.Content {
		if p.Typo == ImageBlock {
			ret.Image = append(ret.Image, fmt.Sprintf("images/%s", p.Data))
		} else {
			if len(ret.Content) < 100 {
				ret.Content += p.Data
			}
		}
	}
	return ret
}

type StoryStatistics struct {
	Year  int `json:"year"`
	Count int `json:"count"`
}
