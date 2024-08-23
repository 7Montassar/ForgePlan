package db

import "github.com/7montassar/ForgePlan/internal/models"

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
