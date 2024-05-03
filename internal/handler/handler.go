package handler

import (
	"net/http"
	"strconv"

	"canoe/internal/db"
	"canoe/internal/model"

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
	router.GET("/words_count", getWordsCount)
	router.GET("/words", getWords)
	router.POST("/add", addParoleWord)

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

func getWordsCount(c *gin.Context) {
	wordsCount := getWordsCountFromDatabase()

	c.JSON(http.StatusOK, gin.H{
		"words_count": wordsCount,
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

func getWords(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "0")
	sizeStr := c.DefaultQuery("size", "20")
	page, _ := strconv.Atoi(pageStr)
	size, _ := strconv.Atoi(sizeStr)
	words := getWordsFromDatabase(page, size)

	c.JSON(http.StatusOK, gin.H{
		"words": words,
	})
}

func addParoleWord(c *gin.Context) {
	var req model.Word
	if err := c.BindJSON(&req); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if err := addParoleWordToDatabase(req); err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"msg": "ok",
	})
}

func addParoleWordToDatabase(req model.Word) error {
	conn, err := db.ConnectPostgresDB()
	if err != nil {
		return err
	}
	err = db.AddWord(conn, req)
	if err != nil {
		return err
	}
	return nil
}

func getQuestionCountFromDatabase() int {
	conn, err := db.ConnectPostgresDB()
	if err != nil {
		return 0
	}

	count, err := db.QueryQuestionCount(conn)
	if err != nil {
		return 0
	}
	return count
}

func getWordsCountFromDatabase() int {
	conn, err := db.ConnectPostgresDB()
	if err != nil {
		return 0
	}

	count, err := db.QueryWordsCount(conn)
	if err != nil {
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

func getWordsFromDatabase(page, size int) []model.Word {
	conn, err := db.ConnectPostgresDB()
	if err != nil {
		return []model.Word{}
	}
	words, err := db.QueryWordsFromDatabase(conn, page, size)
	if err != nil {
		return []model.Word{}
	}
	return words
}
