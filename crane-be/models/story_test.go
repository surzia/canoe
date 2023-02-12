package models

import (
	"reflect"
	"testing"
)

func TestStory(t *testing.T) {
	sid := "123456"
	content := "unit test content"
	hasImage := false

	story := NewStory(sid, content, &hasImage)
	expected := &Story{Sid: sid, Content: content, HasImage: &hasImage}

	if !reflect.DeepEqual(story, expected) {
		t.Errorf("create story %v failed, not same as expected %v", story, expected)
	}
}
