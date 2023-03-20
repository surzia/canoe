package utils

import (
	"fmt"
	"strings"
	"testing"
)

func TestStringFormat100(t *testing.T) {
	storyLen500 := RandomStory(500)
	storyLen50 := RandomStory(50)
	storyLen30 := RandomStory(30)
	ret1 := StringFormat(storyLen500)
	ret2 := StringFormat(storyLen50)
	ret3 := StringFormat(storyLen30)
	if strings.Compare(ret1, fmt.Sprintf("%.300s...", string([]rune(storyLen500)[:100]))) != 0 {
		t.Errorf("expected %s, but got %s", fmt.Sprintf("%.300s...", string([]rune(storyLen500)[:100])), ret1)
	}
	if strings.Compare(ret2, storyLen50) != 0 {
		t.Errorf("expected %s, but got %s", fmt.Sprintf("%.50s...", string([]rune(storyLen50)[:33])), ret2)
	}
	if strings.Compare(ret3, storyLen30) != 0 {
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

func TestConvertOrDefault(t *testing.T) {
	str1 := "1"
	str2 := ""
	str3 := "a"

	ret1 := ConvertOrDefault(str1, 2)
	ret2 := ConvertOrDefault(str2, 2)
	ret3 := ConvertOrDefault(str3, 3)

	if ret1 != 1 {
		t.Errorf("expect 1 but got %d", ret1)
	}
	if ret2 != 2 {
		t.Errorf("expect 2 but got %d", ret2)
	}
	if ret3 != 3 {
		t.Errorf("expect 3 but got %d", ret3)
	}
}
