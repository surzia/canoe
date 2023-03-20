package models

import (
	"reflect"
	"testing"
)

func TestToReq(t *testing.T) {
	p := &Paragraph{
		Sid:      "12345",
		Pid:      "pid",
		Sequence: 1,
		Data:     "test",
		Typo:     TextBlock,
	}

	r := ParagraphReq{
		Pid:      "pid",
		Sequence: 1,
		Data:     "test",
		Typo:     TextBlock,
	}

	got := p.ToReq()
	if !reflect.DeepEqual(got, r) {
		t.Errorf("expect %v, but got %v", r, got)
	}
}
