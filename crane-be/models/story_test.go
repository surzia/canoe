package models

import (
	"reflect"
	"sort"
	"testing"
	"time"
)

func TestStoryCmp(t *testing.T) {
	s1 := Story{
		Sid: "story1",
	}
	s2 := Story{
		Sid: "story1",
	}
	s3 := Story{
		Sid: "story1",
	}
	s4 := Story{
		Sid: "story1",
	}

	var storyCmp StoryCmp = []*Story{&s1, &s2, &s3, &s4}
	sort.Sort(storyCmp)
	storyCmp.Swap(0, 1)
	sort.Sort(storyCmp)
}

func TestLite(t *testing.T) {
	ret1 := &StoryFeed{
		Sid:       "12345678",
		CreatedAt: time.Date(2023, time.March, 20, 14, 0, 0, 0, time.Local),
		UpdatedAt: time.Date(2023, time.March, 20, 14, 0, 0, 0, time.Local),
		Content: []Paragraph{
			{
				Sid:      "12345678",
				Pid:      "pid1",
				Sequence: 1,
				Data:     "test1",
				Typo:     TextBlock,
			},
			{
				Sid:      "12345678",
				Pid:      "pid2",
				Sequence: 2,
				Data:     "test.jpg",
				Typo:     ImageBlock,
			},
		},
	}

	ret2 := &StoryFeedLite{
		Sid:       "12345678",
		CreatedAt: time.Date(2023, time.March, 20, 14, 0, 0, 0, time.Local),
		UpdatedAt: time.Date(2023, time.March, 20, 14, 0, 0, 0, time.Local),
		Content:   "test1",
		Image:     []string{"images/test.jpg"},
	}

	got := ret1.Lite()
	if !reflect.DeepEqual(got, ret2) {
		t.Errorf("expect %v, but got %v", ret2, got)
	}
}
