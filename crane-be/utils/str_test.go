package utils

import (
	"testing"
)

func TestRandInt(t *testing.T) {
	ret := RandInt(1, 10)
	if ret < 1 || ret > 10 {
		t.Errorf("result should be in [1, 10], but got %d", ret)
	}
}

func TestRandomStory(t *testing.T) {
	story := RandomStory(20)
	if len(story) != 20*3 {
		t.Errorf("generated story '%s' length should be 20, but got %d", story, len(story))
	}
}
