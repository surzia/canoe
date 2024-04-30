package handler

import (
	"canoe/internal/db"
	"canoe/internal/model"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(CORSMiddleware())

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello, this is a simple HTTP server!")
	})
	router.GET("/question_count", getQuestionCount)
	router.GET("/question", getQuestionById)

	return router
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		if c.Request.Method == "OPTIONS" {
			c.JSON(200, nil)
			return
		}
		c.Next()
	}
}

func getQuestionCount(c *gin.Context) {
	questionCount := getQuestionCountFromDatabase()

	c.JSON(http.StatusOK, gin.H{
		"question_count": questionCount,
	})
}

func getQuestionById(c *gin.Context) {
	idStr := c.DefaultQuery("id", "0")
	id, _ := strconv.Atoi(idStr)
	question := getQuestionByIdFromDatabase(id)

	c.JSON(http.StatusOK, gin.H{
		"question": question,
	})
}

func getQuestionCountFromDatabase() int {
	conn, err := db.ConnectPostgresDB()
	if err != nil {
		fmt.Println(err)
		return 0
	}

	count, err := db.QueryQuestionCount(conn)
	if err != nil {
		fmt.Println(err)
		return 0
	}
	return count
}

func getQuestionByIdFromDatabase(id int) model.Question {
	conn, err := db.ConnectPostgresDB()
	if err != nil {
		return model.Question{}
	}

	question, err := db.QueryQuestionBySerial(conn, id)
	if err != nil {
		return model.Question{}
	}
	return question
}
