package db

import (
	"fmt"

	"storyx/internal/paragraph"
)

type ParagraphDB struct {
	*PGDatabase
}

func (p *ParagraphDB) Create(record interface{}) error {
	r, ok := record.(paragraph.Paragraph)
	if !ok {
		return fmt.Errorf("invalid record")
	}

	tx := p.Conn.Table("paragraph").Create(&r)
	return tx.Error
}

func (p *ParagraphDB) Update(record interface{}) error {
	r, ok := record.(paragraph.Paragraph)
	if !ok {
		return fmt.Errorf("invalid record")
	}

	tx := p.Conn.Table("paragraph").Save(&r)
	return tx.Error
}

func (p *ParagraphDB) Read(record interface{}) (interface{}, error) {
	r, ok := record.(paragraph.Paragraph)
	if !ok {
		return nil, fmt.Errorf("invalid record")
	}

	var res paragraph.Paragraph
	tx := p.Conn.Table("paragraph").Where(&r).First(&res)
	return res, tx.Error
}

func (p *ParagraphDB) Delete(record interface{}) error {
	r, ok := record.(paragraph.Paragraph)
	if !ok {
		return fmt.Errorf("invalid record")
	}

	tx := p.Conn.Table("paragraph").Unscoped().Delete(&r)
	return tx.Error
}
