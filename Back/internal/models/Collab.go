package models

type Task struct {
	Id          int
	ProjectId   int
	Title       string
	Description string
	//Deadline    sql.NullTime
	Completed bool
}
type Collaborator struct {
	Id    int
	Name  string
	Email string
	Tasks []Task
}

func NewCollaborator() *Collaborator {
	return &Collaborator{
		Tasks: make([]Task, 0),
	}
}
func (c *Collaborator) AddTask(t Task) {
	c.Tasks = append(c.Tasks, t)
}
