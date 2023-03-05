VERSION=1.2
BINARY_NAME=crane${VERSION}
ROOT_PATH=$(CURDIR)
BACKEND_PATH=${ROOT_PATH}/crane-be
FRONTEND_PATH=${ROOT_PATH}/crane-fe

banner:
	@echo "千纸鹤写作，随时随地随意记录故事"
	@echo "Papercrane writer, Write your story in papercrane. Anywhere. Anytime. Anyway."
	@echo "version ${VERSION}"

build:
	cd ${BACKEND_PATH} && \
	GOARCH=amd64 GOOS=darwin go build -o ${BINARY_NAME}-darwin main.go && \
	GOARCH=amd64 GOOS=linux go build -o ${BINARY_NAME}-linux main.go && \
	GOARCH=amd64 GOOS=windows go build -o ${BINARY_NAME}-windows main.go

run:
	./crane-be/${BINARY_NAME}

test:
	cd $(CURDIR)/crane-be && \
	go test -cover ./api ./dao ./middleware ./models ./services ./utils

build_and_run: build run

clean:
	cd $(CURDIR)/crane-be && \
	go clean && \
	rm ${BINARY_NAME}-darwin && \
	rm ${BINARY_NAME}-linux && \
	rm ${BINARY_NAME}-windows

docker:
	docker build -t papercrane:${VERSION} . && \
	docker tag papercrane:${VERSION} surzia/papercrane:${VERSION} && \
	docker tag papercrane:${VERSION} surzia/papercrane:latest

all: banner build_and_run