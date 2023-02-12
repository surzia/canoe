package models

type JianGuoConnectReq struct {
	User     string `json:"user"`
	Password string `json:"password"`
}

type UploadToJianGuoYunReq struct {
	StoryId string `json:"sid"`
}
