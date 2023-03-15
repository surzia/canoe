package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestCORSMiddleware(t *testing.T) {
	r := gin.Default()
	r.Use(CORSMiddleware())

	origin := "*"

	server := httptest.NewServer(r)
	defer server.Close()

	client := &http.Client{}
	req, _ := http.NewRequest(
		"GET",
		"http://"+server.Listener.Addr().String()+"/api",
		nil,
	)
	req.Header.Add("Origin", origin)

	get, err := client.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	o := get.Header.Get("Access-Control-Allow-Origin")
	if o != origin {
		t.Errorf("Got '%s' ; expecting origin '%s'", o, origin)
	}

	req, _ = http.NewRequest(
		"OPTIONS",
		"http://"+server.Listener.Addr().String()+"/api",
		nil,
	)
	req.Header.Add("Origin", origin)

	get, err = client.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	o = get.Header.Get("Access-Control-Allow-Origin")
	if o != origin {
		t.Errorf("Got '%s' ; expecting origin '%s'", o, origin)
	}
}
