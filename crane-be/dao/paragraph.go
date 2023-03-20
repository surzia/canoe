package dao

import (
	"papercrane/models"

	"gorm.io/gorm"
)

type ParagraphDao struct {
	db *gorm.DB
}

func NewParagraphDao(db *gorm.DB) *ParagraphDao {
	paragraphDao := &ParagraphDao{db: db}

	return paragraphDao
}

func (p *ParagraphDao) CreateParagraph(req models.ParagraphReq, storyID string) {
	paragraph := &models.Paragraph{
		Sid:      storyID,
		Pid:      req.Pid,
		Sequence: req.Sequence,
		Data:     req.Data,
		Typo:     req.Typo,
	}

	p.db.Create(paragraph)
}

func (p *ParagraphDao) SearchFromStories(word string) []string {
	paragraphs := []models.Paragraph{}
	p.db.Where("typo = 1 AND data LIKE ?", "%"+word+"%").Find(&paragraphs)

	paraMap := make(map[string]bool)
	for _, p := range paragraphs {
		if _, ok := paraMap[p.Sid]; !ok {
			paraMap[p.Sid] = true
		}
	}

	ret := []string{}
	for k := range paraMap {
		ret = append(ret, k)
	}

	return ret
}

func (p *ParagraphDao) QueryAllParagraphByStoryID(id string) []models.Paragraph {
	paragraphs := []models.Paragraph{}
	p.db.Where("sid = ?", id).Find(&paragraphs)
	return paragraphs
}

func (p *ParagraphDao) DeleteParagraphByStoryID(id string) {
	p.db.Model(&models.Paragraph{}).Where("sid = ?", id).Unscoped().Delete(&models.Paragraph{})
}

func (p *ParagraphDao) DeleteParagraph() {
	p.db.Model(&models.Paragraph{}).Where("1 = 1").Unscoped().Delete(&models.Paragraph{})
}

func (p *ParagraphDao) GetImageList() []models.Image {
	paragraphs := []models.Paragraph{}
	images := []models.Image{}
	p.db.Where("typo = ?", models.ImageBlock).Find(&paragraphs)

	for _, p := range paragraphs {
		images = append(images, models.Image{
			Sid:      p.Sid,
			Filename: p.Data,
		})
	}
	return images
}
