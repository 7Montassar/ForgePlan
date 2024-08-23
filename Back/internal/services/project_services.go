package services

import (
	"github.com/7montassar/ForgePlan/internal/db"
	"github.com/7montassar/ForgePlan/internal/models"
)

func GetProjects() ([]models.Project, error) {
	db, err := db.NewDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	projects, err := db.FetchProjects()
	if err != nil {
		return nil, err
	}
	return projects, nil
}
