frontend:
	cd crane-fe && npm run build

backend:
	cd crane-be && go build -o papercrane .

fe-dev:
	cd crane-fe && npm install && npm start

be-dev:
	cd crane-be && go run main.go

test:
	cd crane-be && go test -cover ./api ./dao ./middleware ./models ./services ./utils


.PHONY: frontend backend