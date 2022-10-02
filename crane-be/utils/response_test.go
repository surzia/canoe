package utils

import (
	"fmt"
	"reflect"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
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
	if !reflect.DeepEqual(okRes, gin.H{"msg": "success", "data": msg}) {
		t.Errorf("expect %v, but got %v", gin.H{"msg": "success", "data": msg}, okRes)
	}

	err := fmt.Errorf("test error")
	errRes := ERROR(err)
	if !reflect.DeepEqual(errRes, gin.H{"msg": err}) {
		t.Errorf("expect %v, but got %v", gin.H{"msg": err}, errRes)
	}
}
