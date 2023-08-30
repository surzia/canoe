package configs

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	DbConf DBConf
}

type DBConf struct {
	Host     string `json:"host"`
	Database string `json:"database"`
	User     string `json:"user"`
	Password string `json:"password"`
	Port     string `json:"port"`
}

func InitConfig() *Config {

	return &Config{
		DbConf: DBConf{
			Host:     os.Getenv("PG_HOST"),
			Database: os.Getenv("PG_DATABASE"),
			User:     os.Getenv("PG_USER"),
			Password: os.Getenv("PG_PASSWORD"),
			Port:     os.Getenv("PG_PORT"),
		}}
}
