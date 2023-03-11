package dao

import (
	"papercrane/models"

	"gorm.io/gorm"
)

type SyncDao struct {
	db *gorm.DB
}

func NewSyncDao(db *gorm.DB) *SyncDao {
	syncDao := &SyncDao{db: db}

	return syncDao
}

func (s *SyncDao) CreateSync(req *models.SaveSyncReq) {
	ret := s.db.Create(req.ToSync())
	if ret.Error != nil {
		panic(ret.Error)
	}
}

func (s *SyncDao) FetchUsernameAndPasswordByType(server string) (string, string) {
	var sync models.Sync
	s.db.Where("type = ?", server).First(&sync)
	return sync.Username, sync.Password
}
