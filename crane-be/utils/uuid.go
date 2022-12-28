package utils

import (
	"strings"

	"github.com/google/uuid"
)

func GenerateUUID() string {
	uuid := uuid.New()
	key := uuid.String()
	value := strings.Replace(key, "-", "", -1)
	return value
}
