package dao

import (
	"fmt"
	"testing"
	"time"

	"papercrane/models"
	"papercrane/utils"
)

func TestCreateStory(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)

	sid := "12345678"
	content := "test create story"

	req := &models.CreateStoryRequest{Sid: sid, Content: content, HasImage: false}
	dao.CreateStory(req)

	var res models.Story
	var count int64
	conn.Model(&models.Story{}).Where("sid = ? and content = ? and has_image = false", sid, content).Scan(&res)
	conn.Model(&models.Story{}).Where("sid = ? and content = ? and has_image = false", sid, content).Count(&count)

	if res.Sid != sid || res.Content != content || *res.HasImage {
		t.Errorf("create story failed, got story %v", res)
	}
	if count != 1 {
		t.Errorf("story count should be 1 but got %d", count)
	}

	conn.Where("1 = 1").Delete(&models.Story{})
}

func TestCountStories(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)

	var expected = 10
	for i := 0; i < expected; i++ {
		var content string
		if i%2 == 0 {
			content = "even"
		} else {
			content = "odd"
		}
		story := &models.Story{
			Content: content,
		}
		ret := conn.Create(story)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}
	res := dao.CountStories("")
	if res != int64(expected) {
		t.Errorf("story count should be %d but got %d", expected, res)
	}

	res = dao.CountStories("even")
	if res != 5 {
		t.Errorf("story count should be %d but got %d", expected, res)
	}
	conn.Where("1 = 1").Delete(&models.Story{})
}

func TestQueryStories(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)

	var expected = 30
	for i := 0; i < expected; i++ {
		story := &models.Story{
			Sid:     fmt.Sprintf("sid_%d", i),
			Content: fmt.Sprintf("test content %d", i),
		}
		ret := conn.Create(story)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}

	res := dao.QueryStories(1, 10, "desc", "")
	for i, v := range res {
		if v.Sid != fmt.Sprintf("sid_%d", expected-1-i) || v.Content != fmt.Sprintf("test content %d", expected-1-i) {
			t.Errorf("%d-th story sid and content should be %s, %s but got %s, %s", i, fmt.Sprintf("sid_%d", expected-1-i), fmt.Sprintf("test content %d", expected-1-i), v.Sid, v.Content)
		}
	}

	res = dao.QueryStories(2, 10, "desc", "")
	for i, v := range res {
		if v.Sid != fmt.Sprintf("sid_%d", expected-11-i) || v.Content != fmt.Sprintf("test content %d", expected-11-i) {
			t.Errorf("%d-th story sid and content should be %s, %s but got %s, %s", i, fmt.Sprintf("sid_%d", expected-11-i), fmt.Sprintf("test content %d", expected-11-i), v.Sid, v.Content)
		}
	}

	res = dao.QueryStories(3, 10, "asc", "")
	for i, v := range res {
		if v.Sid != fmt.Sprintf("sid_%d", i+20) || v.Content != fmt.Sprintf("test content %d", i+20) {
			t.Errorf("%d-th story sid and content should be %s, %s but got %s, %s", i, fmt.Sprintf("sid_%d", i+20), fmt.Sprintf("test content %d", i+20), v.Sid, v.Content)
		}
	}

	res = dao.QueryStories(1, 5, "asc", "content")
	for i, v := range res {
		if v.Sid != fmt.Sprintf("sid_%d", i) || v.Content != fmt.Sprintf("test content %d", i) {
			t.Errorf("%d-th story sid and content should be %s, %s but got %s, %s", i, fmt.Sprintf("sid_%d", i), fmt.Sprintf("test content %d", i), v.Sid, v.Content)
		}
	}
	conn.Where("1 = 1").Delete(&models.Story{})
}

func TestViewStory(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)

	sid := "12345678"
	content := "test create story"

	req := &models.CreateStoryRequest{Sid: sid, Content: content, HasImage: false}
	dao.CreateStory(req)

	story := dao.ViewStory(sid)
	if story.Sid != sid || story.Content != content {
		t.Errorf("create story failed, got story %v", story)
	}

	conn.Where("1 = 1").Delete(&models.Story{})
}

func TestUpdateStory(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)

	sid := "12345678"
	content := "test create story"

	req := &models.CreateStoryRequest{Sid: sid, Content: content, HasImage: false}
	dao.CreateStory(req)

	story := dao.ViewStory(sid)
	if story.Sid != sid || story.Content != content {
		t.Errorf("create story failed, got story %v", story)
	}

	req_ := &models.UpdateStoryRequest{Sid: sid, Content: "updated content"}
	updated := dao.UpdateStory(req_)
	if updated.Sid != sid || updated.Content != "updated content" {
		t.Errorf("updated story failed, got story %v", updated)
	}
	conn.Where("1 = 1").Delete(&models.Story{})
}

func TestGetAllStoryIDList(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)
	var expected = 30
	var expectedStories []models.Story
	for i := 0; i < expected; i++ {
		story := &models.Story{
			Sid:     fmt.Sprintf("sid_%d", i),
			Content: fmt.Sprintf("test content %d", i),
		}
		expectedStories = append(expectedStories, *story)
		ret := conn.Create(story)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}
	stories := dao.GetAllStoryIDList()

	if len(stories) != len(expectedStories) {
		t.Errorf("get %d stories, but expect %d", len(stories), len(expectedStories))
	}
}

func TestHighlightedDays(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)

	var expectedDays = []int{2, 4, 6, 8, 9, 11, 17}
	for _, v := range expectedDays {
		story := &models.Story{
			Sid:     fmt.Sprintf("sid_%d", v),
			Content: fmt.Sprintf("test content %d", v),
		}
		story.CreatedAt = time.Date(2023, time.April, v, 1, 0, 0, 0, time.UTC)
		ret := conn.Create(story)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}

	days := dao.HighlightedDays("2023-04")
	if len(days) != len(expectedDays) {
		t.Errorf("expect %d records, but got %d", len(expectedDays), len(days))
		return
	}
	for i := 0; i < len(expectedDays); i++ {
		if days[i] != expectedDays[i] {
			t.Errorf("expect %d, but got %d", expectedDays[i], days[i])
		}
	}

	for _, v := range expectedDays {
		story := &models.Story{
			Sid:     fmt.Sprintf("sid_%d", v),
			Content: fmt.Sprintf("test content %d", v),
		}
		story.CreatedAt = time.Date(2023, time.December, v, 1, 0, 0, 0, time.UTC)
		ret := conn.Create(story)
		if ret.Error != nil {
			panic(ret.Error)
		}
	}
	days = dao.HighlightedDays("2023-12")
	if len(days) != len(expectedDays) {
		t.Errorf("expect %d records, but got %d", len(expectedDays), len(days))
		return
	}
	for i := 0; i < len(expectedDays); i++ {
		if days[i] != expectedDays[i] {
			t.Errorf("expect %d, but got %d", expectedDays[i], days[i])
		}
	}

	conn.Where("1 = 1").Delete(&models.Story{})
}

func TestStatistics(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Delete(&models.Story{})
	dao := NewStoryDao(conn)

	var expected = map[int]int{
		2021: 4,
		2022: 7,
		2023: 6,
	}
	for k, v := range expected {
		for i := 0; i < v; i++ {
			story := &models.Story{
				Sid:     fmt.Sprintf("sid_%d", i),
				Content: fmt.Sprintf("test content %d", i),
			}
			story.CreatedAt = time.Date(k, time.April, 1, 1, 0, 0, 0, time.UTC)
			ret := conn.Create(story)
			if ret.Error != nil {
				panic(ret.Error)
			}
		}
	}

	days := dao.Statistics()
	if (days[0].Year != 2021 || days[0].Count != 4) && (days[1].Year != 2021 || days[1].Count != 4) && (days[2].Year != 2021 || days[2].Count != 4) {
		t.Error("2021 expects 4")
		return
	}
	if (days[0].Year != 2022 || days[0].Count != 7) && (days[1].Year != 2022 || days[1].Count != 7) && (days[2].Year != 2022 || days[2].Count != 7) {
		t.Error("2022 expects 7")
		return
	}
	if (days[0].Year != 2023 || days[0].Count != 6) && (days[1].Year != 2023 || days[1].Count != 6) && (days[2].Year != 2023 || days[2].Count != 6) {
		t.Error("2023 expects 6")
		return
	}

	conn.Where("1 = 1").Delete(&models.Story{})
}
