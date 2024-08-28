package db

import (
	"errors"
	"fmt"
	"github.com/7montassar/ForgePlan/config"
	"github.com/7montassar/ForgePlan/internal/models"
	"github.com/7montassar/ForgePlan/pkg"
)

var (
	ignore interface{}
)

func (db *DB) FetchProjects() ([]models.Project, error) {
	rows, err := db.Query("SELECT id, name, deadline, image FROM projects")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var projects []models.Project
	for rows.Next() {
		var project models.Project
		err := rows.Scan(&project.Id, &project.Name, &project.Deadline, &project.Image)
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
	var collaborator models.Collaborator
	collabId := 1
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
	row, err = db.QueryRow("SELECT * FROM collaborators WHERE id = $1", collabId)
	if err != nil {
		return err
	}
	err = row.Scan(&collaborator.Id, &collaborator.Name, &collaborator.Email)
	if err != nil {
		return err
	}
	project.AddCollaborator(collaborator)
	_, err = db.Exec("INSERT INTO projects_collaborators (project_id, collaborator_id) VALUES ($1, $2)", project.Id, project.Collaborators[0].Id)
	if err != nil {
		return err
	}
	return nil
}

func (db *DB) UpdateProjectImage(projectID int, image string) error {
	res, err := db.Exec("UPDATE projects SET image = $1 WHERE id = $2", image, projectID)
	if err != nil {
		return err
	}
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return errors.New("no rows affected")
	}
	return nil
}

func (db *DB) FetchCollaborators(projectID int) ([]models.Collaborator, error) {
	rows, err := db.Query("SELECT * FROM collaborators c WHERE c.id IN (SELECT collaborator_id FROM projects_collaborators WHERE project_id = $1)", projectID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var collaborators []models.Collaborator
	for rows.Next() {
		collaborator := models.NewCollaborator()
		err := rows.Scan(&collaborator.Id, &collaborator.Name, &collaborator.Email)
		if err != nil {
			return nil, err
		}
		rows2, err := db.Query("SELECT * FROM tasks WHERE collaborator_id = $1 AND project_id = $2", collaborator.Id, projectID)
		if err != nil {
			return nil, err
		}
		defer rows2.Close()
		for rows2.Next() {
			task := models.Task{}
			err := rows2.Scan(&task.Id, &task.ProjectId, &ignore, &task.Title, &task.Description, &task.Completed)
			if err != nil {
				return nil, err
			}
			collaborator.AddTask(task)
		}
		collaborators = append(collaborators, *collaborator)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return collaborators, nil
}
