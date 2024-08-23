package models

import "time"

type Project struct {
	Id       int
	Name     string
	Deadline time.Time
	Pdf      string
	Image    string
}
