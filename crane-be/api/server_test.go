package api

import (
	"testing"

	"papercrane/utils"
)

func TestNewServer(t *testing.T) {
	conn := utils.InitDB("../test.db")
	server := NewServer(conn, "", "")
	if server == nil {
		t.Error("papercrane server init failed")
	}
}
