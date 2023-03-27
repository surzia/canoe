package services

import (
	"papercrane/models"
	"papercrane/utils"
	"testing"

	"gorm.io/gorm"
)

func newParagraphService(t *testing.T, db *gorm.DB) *ParagraphService {
	service := NewParagraphService(db)
	if service == nil {
		t.Error("failed to init paragraph service")
	}

	return service
}

func TestParagraphService(t *testing.T) {
	conn := utils.InitDB("../test.db")
	svc := newParagraphService(t, conn)

	var req models.StoryReq
	req.Sid = "sid"
	req.Paragraph = make([]models.ParagraphReq, 0)
	req.Paragraph = append(req.Paragraph, models.ParagraphReq{
		Sequence: 1,
		Data:     "test data1",
		Typo:     models.TextBlock,
	})
	req.Paragraph = append(req.Paragraph, models.ParagraphReq{
		Pid:      "pid",
		Sequence: 2,
		Data:     "test data2",
		Typo:     models.TextBlock,
	})
	svc.CreateParagraph(&req)

	var r models.StoryFeed
	r.Sid = "sid"
	r.Content = []models.Paragraph{}
	r.Content = append(r.Content, models.Paragraph{
		Sid:      "sid",
		Sequence: 1,
		Data:     "test",
		Typo:     models.TextBlock,
	})
	r.Content = append(r.Content, models.Paragraph{
		Sid:      "sid",
		Sequence: 2,
		Data:     "test.png",
		Typo:     models.ImageBlock,
	})
	svc.UpdateParagraph(&r)
	svc.UpdateStoryContent(&r)

	ret := svc.SearchFromStories("test")
	if len(ret) != 1 {
		t.Errorf("expect 1 but got %d", len(ret))
		return
	}
	if ret[0] != req.Sid {
		t.Errorf("expect %s but got %s", req.Sid, ret[0])
	}
	imgs := svc.GetImageList()
	if len(imgs) != 1 {
		t.Errorf("expect 1 but got %d", len(imgs))
		return
	}
	svc.DeleteParagraph()

	conn.Where("1 = 1").Delete(&models.Paragraph{})
}
