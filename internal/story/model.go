package story

import (
	"time"

	"storyx/internal/paragraph"
)

type Story struct {
	ID          uint64    `json:"id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
}

type Request struct {
	Meta Story                 `json:"meta"`
	Body []paragraph.Paragraph `json:"body"`
}
