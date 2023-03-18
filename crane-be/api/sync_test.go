package api

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"papercrane/models"
)

func TestSave(t *testing.T) {
	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)
	mockPostReq(ctx, models.SaveSyncReq{
		Type:     "nutstore",
		Username: "user",
		Password: "passwd",
	})

	server := newServer(t)
	server.Save(ctx)
	if w.Code != http.StatusOK {
		t.Error("http response is not 200")
	}
	got := w.Body.String()
	if got != "{\"msg\":\"success\",\"data\":\"saved\"}" {
		t.Errorf("but got %s", got)
	}
}

func TestUploadFailed(t *testing.T) {
	w := httptest.NewRecorder()
	ctx := GetTestGinContext(w)
	mockPostReq(ctx, models.SyncReq{
		Type:    "nutstore",
		StoryId: "123",
	})

	server := newServer(t)
	server.Upload(ctx)
	if w.Code != http.StatusInternalServerError {
		t.Error("http response is not 500")
	}
	got := w.Body.String()
	if got != "{\"msg\":\"failure\",\"data\":\"story does not exist\"}" {
		t.Errorf("but got %s", got)
	}
}
