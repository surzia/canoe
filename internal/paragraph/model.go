package paragraph

import "time"

type Paragraph struct {
	ID        uint64    `json:"id"`
	StoryID   uint64    `json:"story_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Sequence  int       `json:"sequence"`
	Content   string    `json:"content"`
}
