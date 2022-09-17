package utils

import "github.com/gin-gonic/gin"

// OK renders successful response
func OK(msg interface{}) gin.H {
	return gin.H{
		"msg":  "success",
		"data": msg,
	}
}

// ERROR renders failed respose
func ERROR(err error) gin.H {
	return gin.H{
		"msg": err,
	}
}
