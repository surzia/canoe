package model

import "time"

type Question struct {
	Id           int       `db:"id"`
	CreatedAt    time.Time `db:"created_at"`
	QuestionText string    `db:"question_text"`
	QuestionType int       `db:"question_type"`
	Options      Option    `db:"options"`
	Answer       string    `db:"answer"`
	Class        string    `db:"class"`
	Serial       int       `db:"serial"`
}

type Option struct {
	A string
	B string
	C string
	D string
}
