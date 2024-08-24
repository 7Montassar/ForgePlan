package main

import (
	"fmt"
	"github.com/7montassar/ForgePlan/config"
	"github.com/7montassar/ForgePlan/internal/handlers"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

func main() {

	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/projects", corsMiddleware(handlers.GetProjects))
	mux.HandleFunc("/projects/{id}", corsMiddleware(handlers.GetProject))

	serverAdd := fmt.Sprintf(":%s", cfg.Port)
	fmt.Println("Server started on port", cfg.Port)
	err = http.ListenAndServe(serverAdd, mux)
	if err != nil {
		log.Fatal(err)
	}

}
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	}
}
