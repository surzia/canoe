package utils

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

func StringFormat(raw string) string {

	switch {
	case len(raw) > 300:
		return fmt.Sprintf("%.300s...", string([]rune(raw)[:100]))
	default:
		return raw
	}
}

func RandInt(min, max int64) int64 {
	rand.Seed(time.Now().UnixNano())
	return min + rand.Int63n(max-min)
}

func RandomStory(n int) string {
	ret := make([]rune, n)
	for i := range ret {
		ret[i] = rune(RandInt(19968, 40869))
	}

	return string(ret)
}

func ConvertOrDefault(str string, res int) int {
	r, err := strconv.Atoi(str)
	if err != nil {
		return res
	}
	return r
}
