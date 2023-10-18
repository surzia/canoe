package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"
)

const (
	NEW   = "new"
	POST  = "post"
	BUILD = "build"
)

func main() {
	// Parse the command-line arguments
	if len(os.Args) < 2 {
		fmt.Println("Usage: crane <command> [options]")
		os.Exit(1)
	}

	// Check which subcommand is provided
	switch os.Args[1] {
	case NEW:
		if len(os.Args) < 3 {
			fmt.Println("Usage: crane new [options]")
			os.Exit(1)
		}

		switch os.Args[2] {
		case POST:
			err := createNewPost()
			if err != nil {
				os.Exit(2)
			}
		default:
			fmt.Printf("Invalid %s option. Use 'crane new help' to see all options.", os.Args)
			os.Exit(1)
		}
	case BUILD:
		build()
	default:
		fmt.Println("Invalid command. Use 'crane new post' or 'crane build'.")
		os.Exit(1)
	}
}

func createNewPost() error {
	currentTime := time.Now()
	year := currentTime.Year()
	month := int(currentTime.Month())
	day := currentTime.Day()

	filePath := fmt.Sprintf("docs/%d/%02d/%02d.md", year, month, day)
	err := os.MkdirAll(fmt.Sprintf("docs/%d/%02d", year, month), os.ModePerm)
	if err != nil {
		return fmt.Errorf("Error creating directory: %v\n", err)
	}

	if _, err := os.Stat(filePath); err == nil {
		fmt.Printf("File already exists at %s\n", filePath)
		return err
	}

	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("Error creating file: %v\n", err)
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			panic(err)
		}
	}(file)

	fmt.Printf("Created new post at %s\n", filePath)
	return nil
}

func build() {
	// Generate HTML file content
	htmlContent := fmt.Sprintf("<html><body><h1>All Stories:</h1><ul>")
	// Recursively traverse the "docs" directory and its subdirectories
	err := filepath.Walk("docs", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Printf("Error while walking the directory: %v\n", err)
			return err
		}
		if !info.IsDir() && isMarkdownFile(path) {
			// Add links to Markdown files in the HTML content
			relPath, _ := filepath.Rel("docs", path)
			htmlContent += fmt.Sprintf("<li><a href=\"docs/%s\">%s</a></li>\n", relPath, filepath.Base(relPath))
		}
		return nil
	})

	if err != nil {
		fmt.Printf("Error reading files in the 'docs' directory: %v\n", err)
		return
	}
	htmlContent += "</ul></body></html>"

	// Create the index.html file
	err = ioutil.WriteFile("index.html", []byte(htmlContent), 0644)
	if err != nil {
		fmt.Printf("Error creating index.html: %v\n", err)
		return
	}

	fmt.Println("Created index.html")
}

func isMarkdownFile(fileName string) bool {
	// Check if the file has a .md extension
	return len(fileName) > 3 && fileName[len(fileName)-3:] == ".md"
}
