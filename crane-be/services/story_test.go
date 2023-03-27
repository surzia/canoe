package services

import (
	"fmt"
	"testing"
	"time"

	"papercrane/models"
	"papercrane/utils"

	"gorm.io/gorm"
)

func newStoryService(t *testing.T, db *gorm.DB) *StoryService {
	service := NewStoryService(db)
	if service == nil {
		t.Error("failed to init story service")
	}

	return service
}

func TestStoryService(t *testing.T) {
	conn := utils.InitDB("../test.db")
	svc := newStoryService(t, conn)

	var req models.StoryReq
	req.Sid = "1"
	svc.CreateStory(&req)
	count := svc.CountStories()
	if count != 1 {
		t.Errorf("expect 1 but got %d story", count)
	}
	req.Sid = "2"
	svc.CreateStory(&req)
	req.Sid = "3"
	svc.CreateStory(&req)
	req.Sid = "4"
	svc.CreateStory(&req)
	req.Sid = "5"
	svc.CreateStory(&req)
	req.Sid = "6"
	svc.CreateStory(&req)
	req.Sid = ""
	svc.CreateStory(&req)
	ret := svc.QueryFromAllStories(1, 5, "desc")
	if len(ret) != 5 {
		t.Errorf("expect 5 but got %d", len(ret))
	}

	ret = svc.QueryFromHitStories(1, 5, "desc", []string{"1", "2", "3", "4", "6"})
	if len(ret) != 5 {
		t.Errorf("expect 5 but got %d", len(ret))
	}
	ids := svc.GetAllStoryIDList()
	if len(ids) != 7 {
		t.Errorf("expect 7 but got %d", len(ids))
	}

	for _, v := range ret {
		if v.Sid == "5" {
			t.Errorf("got unexpected story id %s", v.Sid)
		}
	}

	var r models.StoryFeed
	r.Sid = "6"
	svc.UpdateStory(&r)
	ret = svc.QueryFromHitStories(1, 5, "asc", []string{"1", "2", "3", "4", "6"})
	if len(ret) != 5 {
		t.Errorf("expect 5 but got %d", len(ret))
	}
	for _, v := range ret {
		if v.Sid == "5" {
			t.Errorf("got unexpected story id %s", v.Sid)
		}
	}

	days := svc.HighlightedDays(fmt.Sprintf("%04d-%02d", time.Now().Year(), time.Now().Month()))
	if len(days) != 7 {
		t.Errorf("expect 7 but got %d", len(days))
	}

	statistics := svc.Statistics()
	if len(statistics) != 1 {
		t.Errorf("expect 1 but got %d", len(statistics))
		return
	}
	if statistics[0].Year != time.Now().Year() {
		t.Errorf("expect %d but got %d", time.Now().Year(), statistics[0].Year)
	}
	if statistics[0].Count != 7 {
		t.Errorf("expect 7 but got %d", statistics[0].Count)
	}

	svc.DeleteStory()
	conn.Where("1 = 1").Delete(&models.Story{})
}
