package utils

import (
	"fmt"
	"testing"
)

func TestGenerateUUID(t *testing.T) {
	uuid := GenerateUUID()
	if len(uuid) == 0 {
		t.Error("failed to generate uuid")
	}
	fmt.Println(uuid)
}
