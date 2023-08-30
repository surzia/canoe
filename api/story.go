package api

import (
	"fmt"
	"net/http"
	"strconv"

	"storyx/internal/story"

	"github.com/gin-gonic/gin"
)

func (s *Server) CreateStory(c *gin.Context) {
	var req story.Request

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, fmt.Errorf("parse request to story failed, error: %v", err))
		return
	}

	if err := s.storyDB.Create(req.Meta); err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Errorf("failed to create story, error: %v", err))
		return
	}
	for _, body := range req.Body {
		if err := s.paragraphDB.Create(body); err != nil {
			c.JSON(http.StatusInternalServerError, fmt.Errorf("failed to create paragraph, error: %v", err))
			return
		}
	}

	c.JSON(http.StatusOK, fmt.Sprintf("story created"))
}

func (s *Server) UpdateStory(c *gin.Context) {
	var req story.Story

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, fmt.Errorf("parse request to story failed, error: %v", err))
		return
	}

	if err := s.storyDB.Update(req); err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Errorf("failed to update story, error: %v", err))
		return
	}

	c.JSON(http.StatusOK, fmt.Sprintf("story updated"))
}

func (s *Server) ReadStory(c *gin.Context) {
	id := c.Query("id")
	storyId, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Errorf("invalid story id, error: %v", err))
		return
	}

	req := story.Story{
		ID: uint64(storyId),
	}
	ret, err := s.storyDB.Read(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Errorf("failed to update story, error: %v", err))
		return
	}

	c.JSON(http.StatusOK, ret)
}

func (s *Server) DeleteStory(c *gin.Context) {
	var req story.Story

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, fmt.Errorf("parse request to story failed, error: %v", err))
		return
	}

	if err := s.storyDB.Delete(req); err != nil {
		c.JSON(http.StatusInternalServerError, fmt.Errorf("failed to delete story, error: %v", err))
		return
	}

	c.JSON(http.StatusOK, fmt.Sprintf("story deleted"))
}
