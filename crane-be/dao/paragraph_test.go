package dao

import (
	"testing"

	"papercrane/models"
	"papercrane/utils"
)

func TestCreateParagraph(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
	dao := NewParagraphDao(conn)

	req := models.ParagraphReq{
		Pid:      "paragraph",
		Sequence: 1,
		Data:     "test paragraph",
		Typo:     models.TextBlock,
	}
	sid := "story_id"

	dao.CreateParagraph(req, sid)

	var res models.Paragraph
	var count int64
	conn.Model(&models.Paragraph{}).Where("sid = ? AND pid = ? AND sequence = ? AND data = ? AND typo = ?", sid, req.Pid, req.Sequence, req.Data, req.Typo).Scan(&res)
	conn.Model(&models.Paragraph{}).Where("sid = ?", sid).Count(&count)

	if res.Sid != sid || res.Pid != req.Pid || res.Sequence != req.Sequence || res.Data != req.Data || res.Typo != req.Typo {
		t.Errorf("create paragraph failed, got paragraph %v", res)
	}
	if count != 1 {
		t.Errorf("paragraph count should be 1 but got %d", count)
	}

	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
}

func TestSearchFromStories(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
	dao := NewParagraphDao(conn)

	req := models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2",
		Typo:     models.TextBlock,
	}
	sid := "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph2",
		Sequence: 2,
		Data:     "keyword1 keyword3",
		Typo:     models.TextBlock,
	}
	sid = "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2 keyword3 keyword4",
		Typo:     models.TextBlock,
	}
	sid = "story_id_2"
	dao.CreateParagraph(req, sid)

	ret1 := dao.SearchFromStories("keyword1")
	ret2 := dao.SearchFromStories("keyword2")
	ret3 := dao.SearchFromStories("keyword3")
	ret4 := dao.SearchFromStories("keyword4")

	if len(ret1) != 2 {
		t.Errorf("error result %v", ret1)
	}
	if (ret1[0] != "story_id_1" && ret1[1] != "story_id_2") && (ret1[1] != "story_id_1" && ret1[0] != "story_id_2") {
		t.Errorf("error result %v", ret1)
	}

	if len(ret2) != 2 {
		t.Errorf("error result %v", ret2)
	}
	if (ret2[0] != "story_id_1" && ret2[1] != "story_id_2") && (ret2[1] != "story_id_1" && ret2[0] != "story_id_2") {
		t.Errorf("error result %v", ret2)
	}

	if len(ret3) != 2 {
		t.Errorf("error result %v", ret3)
	}
	if (ret3[0] != "story_id_1" && ret3[1] != "story_id_2") && (ret3[1] != "story_id_1" && ret3[0] != "story_id_2") {
		t.Errorf("error result %v", ret3)
	}

	if len(ret4) != 1 {
		t.Errorf("error result %v", ret4)
	}
	if ret4[0] != "story_id_2" {
		t.Errorf("error result %v", ret4)
	}

	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
}

func TestQueryAllParagraphByStoryID(t *testing.T) {
	conn := utils.InitDB("../test.db")
	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
	dao := NewParagraphDao(conn)

	req := models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2",
		Typo:     models.TextBlock,
	}
	sid := "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph2",
		Sequence: 2,
		Data:     "keyword1 keyword3",
		Typo:     models.TextBlock,
	}
	sid = "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2 keyword3 keyword4",
		Typo:     models.TextBlock,
	}
	sid = "story_id_2"
	dao.CreateParagraph(req, sid)

	ret1 := dao.QueryAllParagraphByStoryID("story_id_1")
	if len(ret1) != 2 {
		t.Errorf("error result %v", ret1)
	}
	if ret1[0].Sid != "story_id_1" && ret1[1].Sid != "story_id_2" {
		t.Errorf("error result %v", ret1)
	}
	if ret1[0].Pid != "paragraph1" && ret1[1].Pid != "paragraph2" {
		t.Errorf("error result %v", ret1)
	}
	if ret1[0].Sequence != 1 && ret1[1].Sequence != 2 {
		t.Errorf("error result %v", ret1)
	}
	if ret1[0].Data != "keyword1 keyword2" && ret1[1].Data != "keyword2 keyword3" {
		t.Errorf("error result %v", ret1)
	}

	ret2 := dao.QueryAllParagraphByStoryID("story_id_2")
	if len(ret2) != 1 {
		t.Errorf("error result %v", ret2)
	}
	if ret2[0].Sid != "story_id_2" {
		t.Errorf("error result %v", ret1)
	}
	if ret2[0].Pid != "paragraph1" {
		t.Errorf("error result %v", ret1)
	}
	if ret2[0].Sequence != 1 {
		t.Errorf("error result %v", ret1)
	}
	if ret2[0].Data != "keyword1 keyword2 keyword3 keyword4" {
		t.Errorf("error result %v", ret2)
	}

	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
}

func TestDeleteParagraphByStoryID(t *testing.T) {
	conn := utils.InitDB("../test.db")
	dao := NewParagraphDao(conn)
	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})

	req := models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2",
		Typo:     models.TextBlock,
	}
	sid := "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph2",
		Sequence: 2,
		Data:     "keyword1 keyword3",
		Typo:     models.TextBlock,
	}
	sid = "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2 keyword3 keyword4",
		Typo:     models.TextBlock,
	}
	sid = "story_id_2"
	dao.CreateParagraph(req, sid)

	ret := dao.QueryAllParagraphByStoryID("story_id_1")
	if len(ret) != 2 {
		t.Errorf("error result %v", ret)
	}

	ret = dao.QueryAllParagraphByStoryID("story_id_2")
	if len(ret) != 1 {
		t.Errorf("error result %v", ret)
	}

	dao.DeleteParagraphByStoryID("story_id_1")
	ret = dao.QueryAllParagraphByStoryID("story_id_1")
	if len(ret) != 0 {
		t.Errorf("error result %v", ret)
	}

	dao.DeleteParagraphByStoryID("story_id_2")
	ret = dao.QueryAllParagraphByStoryID("story_id_2")
	if len(ret) != 0 {
		t.Errorf("error result %v", ret)
	}

	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
}

func TestDeleteParagraph(t *testing.T) {
	conn := utils.InitDB("../test.db")
	dao := NewParagraphDao(conn)
	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})

	req := models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2",
		Typo:     models.TextBlock,
	}
	sid := "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph2",
		Sequence: 2,
		Data:     "keyword1 keyword3",
		Typo:     models.TextBlock,
	}
	sid = "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2 keyword3 keyword4",
		Typo:     models.TextBlock,
	}
	sid = "story_id_2"
	dao.CreateParagraph(req, sid)

	ret := dao.QueryAllParagraphByStoryID("story_id_1")
	if len(ret) != 2 {
		t.Errorf("error result %v", ret)
	}

	ret = dao.QueryAllParagraphByStoryID("story_id_2")
	if len(ret) != 1 {
		t.Errorf("error result %v", ret)
	}

	dao.DeleteParagraph()
	ret = dao.QueryAllParagraphByStoryID("story_id_1")
	if len(ret) != 0 {
		t.Errorf("error result %v", ret)
	}
	ret = dao.QueryAllParagraphByStoryID("story_id_2")
	if len(ret) != 0 {
		t.Errorf("error result %v", ret)
	}

	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
}

func TestGetImageList(t *testing.T) {
	conn := utils.InitDB("../test.db")
	dao := NewParagraphDao(conn)
	conn.Where("1 = 1").Unscoped().Delete(&models.Paragraph{})

	req := models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "keyword1 keyword2",
		Typo:     models.TextBlock,
	}
	sid := "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph2",
		Sequence: 2,
		Data:     "test1.png",
		Typo:     models.ImageBlock,
	}
	sid = "story_id_1"
	dao.CreateParagraph(req, sid)

	req = models.ParagraphReq{
		Pid:      "paragraph1",
		Sequence: 1,
		Data:     "test2.png",
		Typo:     models.ImageBlock,
	}
	sid = "story_id_2"
	dao.CreateParagraph(req, sid)

	ret := dao.GetImageList()
	if len(ret) != 2 {
		t.Errorf("error result %v", ret)
	}
	if ret[0].Sid != "story_id_1" && ret[1].Sid != "story_id_2" {
		t.Errorf("error result %v", ret)
	}
	if ret[0].Filename != "test1.png" && ret[1].Filename != "test2.png" {
		t.Errorf("error result %v", ret)
	}
}
