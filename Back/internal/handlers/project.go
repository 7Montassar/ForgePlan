package handlers

import (
	"encoding/json"
	"github.com/7montassar/ForgePlan/internal/models"
	"github.com/7montassar/ForgePlan/internal/services"
	"net/http"
	"strconv"
)

func GetProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := services.GetProjects()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(projects); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func GetProject(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	projectID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	project, err := services.GetProject(projectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("content-type", "application/json")
	if err := json.NewEncoder(w).Encode(project); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func CreateProject(w http.ResponseWriter, r *http.Request) {
	project := models.NewProject()
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&project)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = services.CreateProject(project)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("content-type", "application/json")
	if err := json.NewEncoder(w).Encode(project); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func UpdateProjectImage(w http.ResponseWriter, r *http.Request) {
	var project models.Project
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&project)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = services.UpdateProjectImage(project.Id, project.Image)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("content-type", "application/json")
	if err := json.NewEncoder(w).Encode(project); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	projectID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	collaborators, err := services.GetCollaborators(projectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("content-type", "application/json")
	if err := json.NewEncoder(w).Encode(collaborators); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
