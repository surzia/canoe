package models

import (
	"reflect"
	"testing"
)

func TestToSync(t *testing.T) {
	t1 := "nutstore"
	username := "testuser"
	password := "testpassword"

	saveSyncReq := SaveSyncReq{
		Type:     t1,
		Username: username,
		Password: password,
	}
	syncReq := Sync{
		Type:     t1,
		Username: username,
		Password: password,
	}

	req := saveSyncReq.ToSync()
	if !reflect.DeepEqual(*req, syncReq) {
		t.Errorf("to sync req %v failed, not same as expected %v", req, syncReq)
	}
}
