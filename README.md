# PaperCrane

PaperCrane is a simple command-line utility for managing and generating Markdown-based content. It is designed to assist you in creating new posts and generating an index page for your Markdown files, which can be easily rendered using GitHub Pages or other static site generators.

## Features

- Create new Markdown posts with the current date.
- Generate an index page with links to all Markdown files in the "docs" directory.

## Installation

To use PaperCrane, you need to have Go installed. If you don't have it, you can download and install it from [golang.org](https://golang.org/).

You can install PaperCrane using `go get`:

```sh
go get github.com/surzia/papercrane
```

## Usage

PaperCrane currently supports the following commands:

- Create a new post

```sh
crane new post
```

This command will create a new Markdown post in the "docs" directory with the current date in the filename.

- Generate an index page

```sh
crane build
```

This command will generate an HTML index page in the project's root directory, listing all the Markdown files found in the "docs" directory.
