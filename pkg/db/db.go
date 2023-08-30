package db

import (
	"fmt"

	"storyx/configs"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Ops interface {
	Create(record interface{}) error
	Read(record interface{}) (interface{}, error)
	Update(record interface{}) error
	Delete(record interface{}) error
}

type PGDatabase struct {
	Conn *gorm.DB
}

func InitPGDatabase(conf *configs.Config) *PGDatabase {
	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable", conf.DbConf.User, conf.DbConf.Password, conf.DbConf.Database, conf.DbConf.Host, conf.DbConf.Port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil
	}
	return &PGDatabase{
		Conn: db,
	}
}
