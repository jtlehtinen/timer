package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
)

func main() {
	port := flag.Int("port", 8080, "server port to listen on")
	flag.Parse()

	fmt.Fprintf(os.Stdout, "starting server on %d\n", *port)
	fs := http.FileServer(http.Dir("./public/"))

	err := http.ListenAndServe(fmt.Sprintf(":%d", *port), fs)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
	}
}
