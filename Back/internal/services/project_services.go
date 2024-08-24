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
func GetProject(projectID int) (models.Project, error) {
	db, err := db.NewDB()
	if err != nil {
		return models.Project{}, err
	}
	defer db.Close()
	project, err := db.FetchProject(projectID)
	if err != nil {
		return models.Project{}, err
	}
	return project, nil
}
