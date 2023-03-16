package dao

import (
	"fmt"
	"testing"

	"papercrane/models"
	"papercrane/utils"
)

func TestCreateImage(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Image{})
	dao := NewImageDao(conn)

	sid := "12345678"
	filename := "test.png"

	req := &models.CreateImageRequest{Sid: sid, Filename: filename}
	dao.CreateImage(req)

	var res models.Image
	var count int64
	conn.Model(&models.Image{}).Where("sid = ? and filename = ?", sid, filename).Scan(&res)
	conn.Model(&models.Image{}).Where("sid = ? and filename = ?", sid, filename).Count(&count)

	if res.Sid != sid || res.Filename != filename {
		t.Errorf("create image failed, got image %v", res)
	}
	if count != 1 {
		t.Errorf("image count should be 1 but got %d", count)
	}

	conn.Where("1 = 1").Delete(&models.Image{})
}

func TestQueryImagesByStoryId(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Image{})
	dao := NewImageDao(conn)

	var sid1 = "sid1"
	var sid2 = "sid2"
	var expected1 = 3
	var expected2 = 1
	for i := 0; i < expected1; i++ {
		image := &models.Image{
			Sid:      sid1,
			Filename: fmt.Sprintf("test%d.png", i),
		}
		ret := conn.Create(image)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}
	for i := 0; i < expected2; i++ {
		image := &models.Image{
			Sid:      sid2,
			Filename: fmt.Sprintf("test%d.png", i),
		}
		ret := conn.Create(image)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}

	res := dao.QueryImagesByStoryId(sid1)
	if len(res) != expected1 {
		t.Errorf("expect got %d, but get %d actually", expected1, len(res))
	}
	if res[0] != "test0.png" {
		t.Errorf("expect got test0.png, but get %s actually", res[0])
	}
	if res[1] != "test1.png" {
		t.Errorf("expect got test1.png, but get %s actually", res[1])
	}
	if res[2] != "test2.png" {
		t.Errorf("expect got test2.png, but get %s actually", res[2])
	}

	res = dao.QueryImagesByStoryId(sid2)
	if len(res) != expected2 {
		t.Errorf("expect got %d, but get %d actually", expected2, len(res))
	}
	if res[0] != "test0.png" {
		t.Errorf("expect got test0.png, but get %s actually", res[0])
	}
	conn.Where("1 = 1").Delete(&models.Image{})
}

func TestImageList(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Image{})
	dao := NewImageDao(conn)
	var expected = 30
	var expectedImages []models.Image
	for i := 0; i < expected; i++ {
		image := &models.Image{
			Sid:      fmt.Sprintf("sid_%d", i),
			Filename: fmt.Sprintf("test%d.png", i),
		}
		expectedImages = append(expectedImages, *image)
		ret := conn.Create(image)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}
	images := dao.ImageList()

	if len(images) != len(expectedImages) {
		t.Errorf("get %d stories, but expect %d", len(images), len(expectedImages))
	}
}
