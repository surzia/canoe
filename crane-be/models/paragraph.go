package models

import "gorm.io/gorm"

type Paragraph struct {
	gorm.Model
	Sid      string `json:"sid"`
	Pid      string `json:"pid"`
	Sequence int    `json:"sequence"`
	Data     string `json:"data"`
	Typo     int    `json:"typo"`
}

func (p *Paragraph) ToReq() ParagraphReq {
	req := ParagraphReq{
		Pid:      p.Pid,
		Sequence: p.Sequence,
		Data:     p.Data,
		Typo:     p.Typo,
	}
	return req
}

type ParagraphReq struct {
	Pid      string `json:"pid"`
	Sequence int    `json:"sequence"`
	Data     string `json:"data"`
	Typo     int    `json:"typo"`
}
