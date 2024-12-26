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
		DBHost:         getEnv("DB_HOST"),
		DBPort:         getEnv("DB_PORT"),
		DBUser:         getEnv("DB_USER"),
		DBPassword:     getEnv("DB_PASSWORD"),
		DBName:         getEnv("DB_NAME"),
		Port:           getEnv("PORT"),
		GoogleApiKey:   getEnv("GOOGLE_API_KEY"),
		SearchEngineId: getEnv("SEARCH_ENGINE_ID"),
	}, nil
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
