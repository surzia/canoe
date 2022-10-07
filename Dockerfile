FROM node:16.15.1-alpine as frontend
COPY crane-fe /app/crane-fe
WORKDIR /app/crane-fe
RUN npm install
RUN npm run build

FROM golang:1.18-alpine as backend
ENV GO111MODULE=on \
    GOPROXY=https://goproxy.cn,direct
COPY crane-be /app/crane-be
WORKDIR /app/crane-be
RUN apk add build-base
RUN go mod download
RUN go build -o crane .

FROM alpine
WORKDIR /app
COPY --from=frontend /app/crane-fe/build /app/crane-fe/build
COPY --from=backend /app/crane-be/crane /app/crane-be/

EXPOSE 8001
CMD [ "/app/crane-be/crane" ]