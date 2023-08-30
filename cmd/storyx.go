package main

import (
	"log"

	"storyx/api"
)

func main() {
	server := api.Init()
	log.Fatal(server.Run(":8080"))
}
