frontend:
	cd crane-fe && npm run build

backend:
	cd crane-be && go build -o papercrane .

fe-dev:
	cd crane-fe && npm install && npm start

be-dev:
	cd crane-be && go run main.go


.PHONY: frontend backend