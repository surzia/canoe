package models

import "gorm.io/gorm"

type Sync struct {
	gorm.Model
	Type     string `json:"type"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type JianGuoConnectReq struct {
	User     string `json:"user"`
	Password string `json:"password"`
}

type JianGuoYunReq struct {
	StoryId string `json:"sid"`
}
