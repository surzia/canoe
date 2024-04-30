package main

import (
	"log"
	"net/http"

	"canoe/internal/handler"
)

func main() {
	router := handler.SetupRouter()

	log.Println("Server running at :8080")
	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}
