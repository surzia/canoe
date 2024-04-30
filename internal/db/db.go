package db

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"canoe/internal/model"

	_ "github.com/lib/pq"
)

func ConnectPostgresDB() (*sql.DB, error) {
	connstring := "user=postgres dbname=postgres password='postgres' host=localhost port=5432 sslmode=disable"
	db, err := sql.Open("postgres", connstring)
	if err != nil {
		return nil, err
	}
	return db, nil
}

func QueryQuestionCount(db *sql.DB) (int, error) {
	rows, err := db.Query("select count(*) from questions")
	if err != nil {
		return 0, err
	}

	var res = 0
	for rows.Next() {
		rows.Scan(&res)
	}
	return res, nil
}

func QueryQuestionBySerial(db *sql.DB, id int) (model.Question, error) {
	var question model.Question
	var rawOption string
	sqlStr := fmt.Sprintf("select id, created_at, question_text, question_type, options, answer, class, serial from questions where serial = %d", id)
	err := db.QueryRow(sqlStr).Scan(&question.Id, &question.CreatedAt, &question.QuestionText, &question.QuestionType, &rawOption, &question.Answer, &question.Class, &question.Serial)
	if err != nil {
		return model.Question{}, err
	}

	var opt model.Option
	err = json.Unmarshal([]byte(rawOption), &opt)
	if err != nil {
		return model.Question{}, err
	}
	question.Options = opt
	return question, nil
}
