package main

import (
	"flag"
	"fmt"
	"os"
)

const (
	NEW   = "new"
	POST  = "post"
	BUILD = "build"
)

func main() {
	// Create a new subcommand 'new'
	newCmd := flag.NewFlagSet(NEW, flag.ExitOnError)
	// with the 'post' subcommand
	postCmd := newCmd.Bool(POST, false, "Create a new post")

	// Create a new subcommand 'build'
	buildCmd := flag.NewFlagSet("build", flag.ExitOnError)

	// Parse the command-line arguments
	if len(os.Args) < 2 {
		fmt.Println("Usage: crane <command> [options]")
		os.Exit(1)
	}

	// Check which subcommand is provided
	switch os.Args[1] {
	case NEW:
		err := newCmd.Parse(os.Args[2:])
		if err != nil {
			panic(err)
		}
		if *postCmd {
			createNewPost()
		} else {
			fmt.Println("Invalid 'new' subcommand. Use 'crane new post'.")
			os.Exit(1)
		}
	case BUILD:
		err := buildCmd.Parse(os.Args[2:])
		if err != nil {
			panic(err)
		}
		build()
	default:
		fmt.Println("Invalid command. Use 'crane new post' or 'crane build'.")
		os.Exit(1)
	}
}

func createNewPost() {
	// Add your logic for creating a new post here
	fmt.Println("Creating a new post...")
}

func build() {
	// Add your logic for the 'build' command here
	fmt.Println("Building...")
}
