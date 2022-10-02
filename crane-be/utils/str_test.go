package utils

import (
	"fmt"
	"testing"
)

func TestStringFormat100(t *testing.T) {
	storyLen100 := RandomStory(100)
	storyLen50 := RandomStory(50)
	storyLen30 := RandomStory(30)
	ret1 := StringFormat100(storyLen100)
	ret2 := StringFormat100(storyLen50)
	ret3 := StringFormat100(storyLen30)
	if ret1 == storyLen100 {
		t.Errorf("expected %s, but got %s", fmt.Sprintf("%.100s...", string([]rune(storyLen100)[:33])), ret2)
	}
	if ret2 == storyLen50 {
		t.Errorf("expected %s, but got %s", fmt.Sprintf("%.100s...", string([]rune(storyLen100)[:33])), ret2)
	}
	if ret3 != storyLen30 {
		t.Errorf("expected %s, but got %s", storyLen30, ret2)
	}
}

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
