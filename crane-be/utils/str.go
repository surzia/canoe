package utils

import (
	"fmt"
	"math/rand"
	"time"
)

func StringFormat100(raw string) string {

	switch {
	case len(raw) > 100:
		return fmt.Sprintf("%.100s...", string([]rune(raw)[:100]))
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
