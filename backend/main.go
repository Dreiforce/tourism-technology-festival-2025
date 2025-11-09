package main

import (
	"log"
	"net/http"
	"backend/backend"



)


func main() {
	fs := http.FileServer(http.Dir("./../src/search/dist"))
	data := http.FileServer(http.Dir("./datadir"))
	http.Handle("/", fs)
	http.Handle("/datadir/", http.StripPrefix("/datadir/", data))
	http.HandleFunc("/api/doit", backend.Hello)
	http.HandleFunc("/api/find", backend.Findit)

	log.Print("Listening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}