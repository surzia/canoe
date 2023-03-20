package models

import (
	"sort"
	"testing"
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
