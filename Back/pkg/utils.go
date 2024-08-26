package pkg

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

func SearchGoogle(query string, googleApiKey string, searchEngineID string) (string, error) {
	baseURL := "https://www.googleapis.com/customsearch/v1"
	params := url.Values{}
	params.Add("q", query)
	params.Add("key", googleApiKey)
	params.Add("cx", searchEngineID)
	params.Add("num", "1")
	params.Add("searchType", "image")
	params.Add("fileType", "png")

	requestURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())
	resp, err := http.Get(requestURL)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result struct {
		Items []struct {
			Link string `json:"link"`
		} `json:"items"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}

	if len(result.Items) == 0 {
		return "", fmt.Errorf("no results found")
	}

	return result.Items[0].Link, nil
}
