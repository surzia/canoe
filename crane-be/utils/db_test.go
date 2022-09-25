package utils

import "testing"

func TestMockData(t *testing.T) {
	defer func() {
		err := recover()
		if err != nil {
			t.Errorf("mock data failed, error %v", err)
		}
	}()

	MockData("../papercrane.db", 20)
}
