# README

> Write your story in papercrane. Anywhere. Anytime. Anyway.

## Getting started
The simplest way is to build and run the docker container:
```sh
docker run -d -p 8000:8000 songjie01/papercrane:1.0
```

For local development, use `make` command to build frontend and backend:
```sh
make frontend
make backend
```
Or, start django and react app independently.
```sh
make djangoapp
make reactapp
```