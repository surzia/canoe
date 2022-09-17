package utils

import "github.com/gin-gonic/gin"

func OK(msg interface{}) gin.H {
	return gin.H{
		"msg":  "success",
		"data": msg,
	}
}
