package services

import (
	"papercrane/dao"
	"papercrane/models"
	"papercrane/utils"

	"gorm.io/gorm"
)

type ParagraphService struct {
	db *gorm.DB
}

func NewParagraphService(db *gorm.DB) *ParagraphService {
	paragraphService := &ParagraphService{db: db}

	return paragraphService
}

func (p *ParagraphService) CreateParagraph(req *models.StoryReq) {
	paragraphDao := dao.NewParagraphDao(p.db)
	for idx, para := range req.Paragraph {
		if para.Pid == "" {
			para.Pid = utils.GenerateUUID()
		}
		para.Sequence = idx + 1
		paragraphDao.CreateParagraph(para, req.Sid, req.CreatedAt)
	}
}

func (p *ParagraphService) UpdateParagraph(req *models.StoryFeed) {
	paragraphDao := dao.NewParagraphDao(p.db)
	paragraphDao.DeleteParagraphByStoryID(req.Sid)
	for idx, para := range req.Content {
		para.Pid = utils.GenerateUUID()
		para.Sequence = idx + 1
		paragraphDao.CreateParagraph(para.ToReq(), req.Sid, req.CreatedAt)
	}
}

func (p *ParagraphService) SearchFromStories(word string) []string {
	paragraphDao := dao.NewParagraphDao(p.db)
	storyIDs := paragraphDao.SearchFromStories(word)
	return storyIDs
}

func (p *ParagraphService) UpdateStoryContent(story *models.StoryFeed) {
	paragraphDao := dao.NewParagraphDao(p.db)
	paragraphs := paragraphDao.QueryAllParagraphByStoryID(story.Sid)
	story.Content = paragraphs
}

func (p *ParagraphService) DeleteParagraph() {
	paragraphDao := dao.NewParagraphDao(p.db)
	paragraphDao.DeleteParagraph()
}

func (p *ParagraphService) GetImageList() []models.Image {
	paragraphDao := dao.NewParagraphDao(p.db)
	images := paragraphDao.GetImageList()
	return images
}
