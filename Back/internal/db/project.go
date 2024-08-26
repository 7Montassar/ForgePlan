package db

import (
	"fmt"
	"github.com/7montassar/ForgePlan/config"
	"github.com/7montassar/ForgePlan/internal/models"
	"github.com/7montassar/ForgePlan/pkg"
)

func (db *DB) FetchProjects() ([]models.Project, error) {
	rows, err := db.Query("SELECT id, name, deadline, pdf, image FROM projects")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var projects []models.Project
	for rows.Next() {
		var project models.Project
		err := rows.Scan(&project.Id, &project.Name, &project.Deadline, &project.Pdf, &project.Image)
		if err != nil {
			return nil, err
		}
		projects = append(projects, project)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return projects, nil
}

func (db *DB) FetchProject(projectID int) (models.Project, error) {
	row, err := db.QueryRow("SELECT id, name, deadline, pdf, image FROM projects WHERE id = $1", projectID)
	if err != nil {
		return models.Project{}, err
	}
	var project models.Project
	err = row.Scan(&project.Id, &project.Name, &project.Deadline, &project.Pdf, &project.Image)
	if err != nil {
		return models.Project{}, err
	}
	return project, nil
}

func (db *DB) CreateProject(project *models.Project) error {
	cfg, err := config.Load()
	if err != nil {
		return err
	}
	query := fmt.Sprintf("%s logo png", project.Name)
	image, err := pkg.SearchGoogle(query, cfg.GoogleApiKey, cfg.SearchEngineId)
	if err != nil {
		return err
	}
	row, err := db.QueryRow("INSERT INTO  projects (name, deadline, pdf,image) VALUES  ($1, $2, $3, $4) RETURNING id,image", project.Name, project.Deadline, project.Pdf, image)
	if err != nil {
		return err
	}
	err = row.Scan(&project.Id, &project.Image)
	if err != nil {
		return err
	}
	return nil
}
