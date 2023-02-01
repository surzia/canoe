package main

import (
	"log"

	"papercrane/api"
	"papercrane/utils"
)

func main() {
	// init DB
	db := utils.InitDB(utils.DBPath())

	// init server
	srv := api.NewServer(db, utils.ReactStaticFilePath(), utils.StaticPath())
	log.Fatal(srv.Router.Run(":8001"))
}
