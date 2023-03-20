package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"papercrane/models"
)

type mockCreateStory struct {
	Msg  string `json:"msg"`
	Data string `json:"data"`
}

type mockViewStory struct {
	Msg  string       `json:"msg"`
	Data models.Story `json:"data"`
}

type mockQueryStories struct {
	Msg  string                 `json:"msg"`
	Data map[string]interface{} `json:"data"`
}

type mockHighlightedDays struct {
	Msg  string `json:"msg"`
	Data []int  `json:"data"`
}

type mockStatistics struct {
	Msg  string                   `json:"msg"`
	Data []models.StoryStatistics `json:"data"`
}

func testCreateStory(t *testing.T, id string) {
	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)
	mockPostReq(ctx, models.StoryReq{
		Sid: id,
		Paragraph: []models.ParagraphReq{
			{
				Pid:      "1",
				Sequence: 1,
				Data:     "test1",
				Typo:     models.TextBlock,
			},
			{
				Pid:      "2",
				Sequence: 2,
				Data:     "test2",
				Typo:     models.TextBlock,
			},
		},
	})

	server := newServer(t)
	server.CreateStory(ctx)
	if w.Code != http.StatusOK {
		t.Error("http response is not 200")
	}
	got := w.Body.String()
	var res mockCreateStory
	err := json.Unmarshal([]byte(got), &res)
	if err != nil {
		t.Errorf("error %v", err)
	}
	if res.Msg != "success" {
		t.Errorf("error response msg %s", res.Msg)
	}
	if res.Data != fmt.Sprintf("create story with id %s successfully", id) {
		t.Errorf("error story content %s", res.Data)
	}
}

func TestQueryStories(t *testing.T) {
	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)
	u := url.Values{}
	u.Add("page", "1")
	u.Add("size", "5")
	u.Add("sort", "")
	u.Add("word", "")
	mockGetReq(ctx, nil, u)

	server := newServer(t)

	testCreateStory(t, "QueryStories1")
	testCreateStory(t, "QueryStories2")
	testCreateStory(t, "QueryStories3")
	testCreateStory(t, "QueryStories4")
	testCreateStory(t, "QueryStories5")

	server.QueryStories(ctx)
	if w.Code != http.StatusOK {
		t.Error("http response is not 200")
	}
	got := w.Body.String()
	var res mockQueryStories
	err := json.Unmarshal([]byte(got), &res)
	if err != nil {
		t.Errorf("error %v", err)
	}
	if res.Msg != "success" {
		t.Errorf("error response msg %s", res.Msg)
	}
	server.DeleteStory(ctx)
}

func TestViewStory(t *testing.T) {
	testCreateStory(t, "ViewStory")

	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)
	u := url.Values{}
	u.Add("id", "ViewStory")
	mockGetReq(ctx, nil, u)
	server := newServer(t)

	server.ViewStory(ctx)
	if w.Code != http.StatusOK {
		t.Error("http response is not 200")
	}
	got := w.Body.String()
	var res mockViewStory
	err := json.Unmarshal([]byte(got), &res)
	if err != nil {
		t.Errorf("error %v", err)
	}
	if res.Msg != "success" {
		t.Errorf("error response msg %s", res.Msg)
	}
	if res.Data.Sid != "ViewStory" {
		t.Errorf("error story id %s", res.Data.Sid)
	}
	server.DeleteStory(ctx)
}

func TestUpdateStory(t *testing.T) {
	testCreateStory(t, "UpdateStory")
	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)
	mockPostReq(ctx, models.StoryReq{
		Sid: "UpdateStory",
	})

	server := newServer(t)
	server.UpdateStory(ctx)
	if w.Code != http.StatusOK {
		t.Error("http response is not 200")
	}
	got := w.Body.String()
	var res mockCreateStory
	err := json.Unmarshal([]byte(got), &res)
	if err != nil {
		t.Errorf("error %v", err)
	}
	if res.Msg != "success" {
		t.Errorf("error response msg %s", res.Msg)
	}
	server.DeleteStory(ctx)
}

func TestHighlightedDays(t *testing.T) {
	testCreateStory(t, "HighlightedDays")
	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)
	u := url.Values{}
	u.Add("month", "2023-03")
	mockGetReq(ctx, nil, u)

	server := newServer(t)
	server.HighlightedDays(ctx)
	if w.Code != http.StatusOK {
		t.Error("http response is not 200")
	}
	got := w.Body.String()
	server.DeleteStory(ctx)
	var res mockHighlightedDays
	err := json.Unmarshal([]byte(got), &res)
	if err != nil {
		t.Errorf("error %v", err)
	}
	if res.Msg != "success" {
		t.Errorf("error response msg %s", res.Msg)
	}
}

func TestStatistics(t *testing.T) {
	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)

	server := newServer(t)
	server.Statistics(ctx)
	if w.Code != http.StatusOK {
		t.Error("http response is not 200")
	}
	got := w.Body.String()
	var res mockStatistics
	err := json.Unmarshal([]byte(got), &res)
	if err != nil {
		t.Errorf("error %v", err)
	}
	if res.Msg != "success" {
		t.Errorf("error response msg %s", res.Msg)
	}
	server.DeleteStory(ctx)
}
