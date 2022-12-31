VERSION=1.0
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
	GOARCH=amd64 GOOS=windows go build -o ${BINARY_NAME}-windows main.go && \
	go build -o ${BINARY_NAME} main.go && \
	cd ${FRONTEND_PATH} && \
	npm run build

run:
	./crane-be/${BINARY_NAME}

test:
	cd $(CURDIR)/crane-be && \
	go test -cover ./api ./dao ./middleware ./models ./services ./utils

build_and_run: build run

clean:
	cd $(CURDIR)/crane-be
	go clean
	rm ${BINARY_NAME}-darwin
	rm ${BINARY_NAME}-linux
	rm ${BINARY_NAME}-windows

docker:
	docker build -t papercrane:${VERSION} .

all: banner build_and_run