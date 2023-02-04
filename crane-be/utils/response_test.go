package utils

import (
	"fmt"
	"reflect"
	"strings"
	"testing"
	"time"
)

type MockMsg struct {
	Id      int
	Content string
	Created time.Time
}

func TestResponse(t *testing.T) {
	msg := &MockMsg{
		Id:      1,
		Content: "test message",
		Created: time.Now(),
	}
	okRes := OK(msg)
	mockRes := &Response{Msg: "success", Data: msg}
	if strings.Compare(okRes.Msg, mockRes.Msg) != 0 {
		t.Errorf("expect %s, but got %s", mockRes.Msg, okRes.Msg)
	}
	if !reflect.DeepEqual(okRes.Data, mockRes.Data) {
		t.Errorf("expect %v, but got %v", mockRes.Data, okRes.Data)
	}

	err := fmt.Errorf("test error")
	errRes := ERROR(err)
	mockRes = &Response{Msg: "failure", Data: err.Error()}
	if strings.Compare(errRes.Msg, mockRes.Msg) != 0 {
		t.Errorf("expect %s, but got %s", mockRes.Msg, errRes.Msg)
	}
	if !reflect.DeepEqual(errRes.Data, mockRes.Data) {
		t.Errorf("expect %v, but got %v", mockRes.Data, errRes.Data)
	}
}
