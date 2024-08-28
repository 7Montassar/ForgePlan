package models

import "time"

type Project struct {
	Id            int
	Name          string
	Deadline      time.Time
	Pdf           string
	Image         string
	Collaborators []Collaborator
}

func NewProject() *Project {
	return &Project{
		Collaborators: make([]Collaborator, 0),
	}
}
func (p *Project) AddCollaborator(c Collaborator) {
	p.Collaborators = append(p.Collaborators, c)
}
