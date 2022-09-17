package main

import (
	"log"

	"github.com/surzia/crane-be/api"
	"github.com/surzia/crane-be/utils"
)

func main() {
	// init DB
	db := utils.InitDB("papercrane.db")

	// init server
	srv := api.NewServer(db)
	log.Fatal(srv.Router.Run(":8001"))
}
