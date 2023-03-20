package api

import (
	"net/http"

	"papercrane/models"
	"papercrane/services"
	"papercrane/utils"

	"github.com/gin-gonic/gin"
)

func (s *Server) CreateStory(c *gin.Context) {
	var req models.StoryReq
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	// create story and paragraph atomicity
	s.Lock()
	defer s.Unlock()

	storyService := services.NewStoryService(s.db)
	storyService.CreateStory(&req)

	paragraphService := services.NewParagraphService(s.db)
	paragraphService.CreateParagraph(&req)

	c.JSON(http.StatusOK, utils.OK(req.Sid))
}

func (s *Server) QueryStories(c *gin.Context) {
	page := c.Query("page")
	size := c.Query("size")
	sortType := c.Query("sort")
	keyword := c.Query("word")

	var pageNum, pageSize int
	pageNum = utils.ConvertOrDefault(page, 1)
	pageSize = utils.ConvertOrDefault(size, 10)

	if sortType == "" {
		sortType = "desc"
	}

	// query from all stories
	var stories []models.StoryFeed
	var count int64
	storyService := services.NewStoryService(s.db)
	paragraphService := services.NewParagraphService(s.db)
	if keyword == "" {
		stories = storyService.QueryFromAllStories(pageNum, pageSize, sortType)
		count = storyService.CountStories()
	} else {
		// search keywords in paragraph
		hitStoryIDs := paragraphService.SearchFromStories(keyword)
		count = int64(len(hitStoryIDs))
		stories = storyService.QueryFromHitStories(pageNum, pageSize, sortType, hitStoryIDs)
	}

	// fill stories' content with paragraph table
	var result = make([]*models.StoryFeedLite, 0)
	for _, sto := range stories {
		paragraphService.UpdateStoryContent(&sto)
		result = append(result, sto.Lite())
	}

	ret := make(map[string]interface{})
	ret["records"] = count
	ret["count"] = count/int64(pageSize) + 1
	ret["stories"] = result
	c.JSON(http.StatusOK, utils.OK(ret))
}

func (s *Server) ViewStory(c *gin.Context) {
	id := c.Query("id")

	storyService := services.NewStoryService(s.db)
	paragraphService := services.NewParagraphService(s.db)
	sto, err := storyService.ViewStory(id)
	if err != nil {
		c.JSON(http.StatusNotFound, utils.ERROR(err))
		return
	}
	story := models.StoryFeed{
		Sid:       sto.Sid,
		CreatedAt: sto.CreatedAt,
		UpdatedAt: sto.UpdatedAt,
		Content:   []models.Paragraph{},
	}
	paragraphService.UpdateStoryContent(&story)
	c.JSON(http.StatusOK, utils.OK(story))
}

func (s *Server) UpdateStory(c *gin.Context) {
	var req models.StoryFeed
	if err := c.ShouldBindJSON(&req); err != nil {
		panic(err)
	}

	// update story and paragraph atomicity
	s.Lock()
	defer s.Unlock()

	storyService := services.NewStoryService(s.db)
	storyService.UpdateStory(&req)

	paragraphService := services.NewParagraphService(s.db)
	paragraphService.UpdateParagraph(&req)

	c.JSON(http.StatusOK, utils.OK(req.Sid))
}

func (s *Server) HighlightedDays(c *gin.Context) {
	month := c.Query("month")
	storyService := services.NewStoryService(s.db)
	highlightedDays := storyService.HighlightedDays(month)
	c.JSON(http.StatusOK, utils.OK(highlightedDays))
}

func (s *Server) Statistics(c *gin.Context) {
	storyService := services.NewStoryService(s.db)
	statistics := storyService.Statistics()
	c.JSON(http.StatusOK, utils.OK(statistics))
}

func (s *Server) DeleteStory(c *gin.Context) {
	// update story and paragraph atomicity
	s.Lock()
	defer s.Unlock()

	storyService := services.NewStoryService(s.db)
	storyService.DeleteStory()

	paragraphService := services.NewParagraphService(s.db)
	paragraphService.DeleteParagraph()
	c.JSON(http.StatusOK, utils.OK("deleted"))
}
