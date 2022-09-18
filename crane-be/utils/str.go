package utils

import (
	"fmt"
)

func StringFormat100(raw string) string {

	switch {
	case len(raw) > 100:
		return fmt.Sprintf("%.100s...", string([]rune(raw)[:100]))
	default:
		return raw
	}
}
