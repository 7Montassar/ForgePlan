package db

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/7montassar/ForgePlan/config"
	"log"
)

type DB struct {
	conn *sql.DB
}

func NewDB() (*DB, error) {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName)
	conn, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}
	return &DB{conn}, nil
}

func (db *DB) Close() error {
	return db.conn.Close()
}
func (db *DB) Query(query string, args ...interface{}) (*sql.Rows, error) {
	return db.conn.Query(query, args...)
}
func (db *DB) QueryRow(query string, args ...interface{}) (*sql.Row, error) {
	if query == "" {
		return db.conn.QueryRow(""), errors.New("query cannot be empty")
	}
	return db.conn.QueryRow(query, args...), nil
}
