package utils

type Response struct {
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

// OK renders successful response
func OK(msg interface{}) Response {
	return Response{
		Msg:  "success",
		Data: msg,
	}
}

// ERROR renders failed respose
func ERROR(err error) Response {
	return Response{
		Msg:  "failure",
		Data: err.Error(),
	}
}
