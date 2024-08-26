package config

import (
	"github.com/joho/godotenv"
	"os"
)

type Configuration struct {
	Port           string
	DBHost         string
	DBPort         string
	DBUser         string
	DBPassword     string
	DBName         string
	GoogleApiKey   string
	SearchEngineId string
}

func Load() (*Configuration, error) {
	err := godotenv.Load("../../.env")
	if err != nil {
		return nil, err
	}
	return &Configuration{
		DBHost:         getEnv("DB_HOST", "localhost"),
		DBPort:         getEnv("DB_PORT", "5432"),
		DBUser:         getEnv("DB_USER", "postgres"),
		DBPassword:     getEnv("DB_PASSWORD", ""),
		DBName:         getEnv("DB_NAME", "postgres"),
		Port:           getEnv("PORT", "8080"),
		GoogleApiKey:   getEnv("GOOGLE_API_KEY", "AIzaSyBF_3ojJTScBfq7jdS3crubCJnyEZu95Og"),
		SearchEngineId: getEnv("SEARCH_ENGINE_ID", "c26d7077fb1c5480d"),
	}, nil
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
