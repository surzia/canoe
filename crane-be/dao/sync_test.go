package dao

import (
	"testing"

	"papercrane/models"
	"papercrane/utils"
)

func TestCreateSync(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Sync{})
	dao := NewSyncDao(conn)

	t1 := "nutstore"
	username := "testuser"
	password := "testpassword"

	req := &models.SaveSyncReq{
		Type:     t1,
		Username: username,
		Password: password,
	}
	dao.CreateSync(req)

	var res models.Sync
	var count int64
	conn.Model(&models.Sync{}).Where("type = ? and username = ? and password = ?", t1, username, password).Scan(&res)
	conn.Model(&models.Sync{}).Where("type = ? and username = ? and password = ?", t1, username, password).Count(&count)

	if res.Type != t1 || res.Username != username || res.Password != password {
		t.Errorf("create story failed, got story %v", res)
	}
	if count != 1 {
		t.Errorf("story count should be 1 but got %d", count)
	}

	conn.Where("1 = 1").Delete(&models.Sync{})
}

func TestFetchUsernameAndPasswordByType(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Sync{})
	dao := NewSyncDao(conn)

	t1 := "nutstore"
	username := "testuser"
	password := "testpassword"

	sync := &models.Sync{
		Type:     t1,
		Username: username,
		Password: password,
	}
	ret := conn.Create(sync)
	if ret.Error != nil {
		panic(ret.Error)
	}

	u, p := dao.FetchUsernameAndPasswordByType(t1)
	if u != username || p != password {
		t.Errorf("error username %s or password %s, expected username %s and password %s", u, p, username, password)
	}

	u, p = dao.FetchUsernameAndPasswordByType("does_not_exist")
	if u != "" || p != "" {
		t.Errorf("error username %s or password %s, expected username '' and password ''", u, p)
	}
	conn.Where("1 = 1").Delete(&models.Sync{})
}

func TestCheckStatus(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Sync{})
	dao := NewSyncDao(conn)

	t1 := "nutstore"
	username := "testuser"
	password := "testpassword"

	sync := &models.Sync{
		Type:     t1,
		Username: username,
		Password: password,
	}
	ret := conn.Create(sync)
	if ret.Error != nil {
		panic(ret.Error)
	}

	status := dao.CheckStatus(t1)
	if !status {
		t.Error("should not be false")
	}
	conn.Where("1 = 1").Delete(&models.Sync{})
}
