package models

import "gorm.io/gorm"

type Sync struct {
	gorm.Model
	Type     string `json:"type"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type SaveSyncReq struct {
	Type     string `json:"type"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func (s *SaveSyncReq) ToSync() *Sync {
	sync := Sync{
		Type:     s.Type,
		Username: s.Username,
		Password: s.Password,
	}
	return &sync
}

type SyncReq struct {
	StoryId string `json:"sid"`
	Type    string `json:"type"`
}

type SyncAllReq struct {
	Type string `json:"type"`
}
