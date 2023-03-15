package models

import (
	"reflect"
	"testing"
)

func TestImage(t *testing.T) {
	sid := "123456"
	filename := "test.png"

	image := NewImage(sid, filename)
	expected := &Image{Sid: sid, Filename: filename}

	if !reflect.DeepEqual(image, expected) {
		t.Errorf("create image %v failed, not same as expected %v", image, expected)
	}
}
