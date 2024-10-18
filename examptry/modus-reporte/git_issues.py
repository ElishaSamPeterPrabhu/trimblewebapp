import requests
import pandas as pd
import json

# GitHub personal access token
GITHUB_TOKEN = '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'  # Replace this with your actual personal access token

# Repository details
GITHUB_REPO = 'trimble-oss/modus-web-components'

# GitHub API URL for fetching issues
API_URL = f'https://api.github.com/repos/trimble-oss/modus-web-components/issues'

# Parameters to fetch both open and closed issues
params = {
    'state': 'all',  # Options: 'open', 'closed', 'all'
    'per_page': 100  # GitHub API paginates results, max 100 per page
}

# Headers for authentication
headers = {
    'Authorization': f'token {GITHUB_TOKEN}'
}

all_issues = []
page = 1

while True:
    response = requests.get(API_URL, headers=headers, params={**params, 'page': page})
    if response.status_code != 200:
        raise Exception(f"Error fetching issues: {response.status_code}\n{response.json().get('message')}")
    issues = response.json()
    if not issues:
        break
    all_issues.extend(issues)
    page += 1

# Filter out pull requests from issues
filtered_issues = [issue for issue in all_issues if 'pull_request' not in issue]

# Extract relevant details
issue_data = []
for issue in filtered_issues:
    issue_info = {
        'id': issue['id'],
        'number': issue['number'],
        'title': issue['title'],
        'labels': [label['name'] for label in issue['labels']],
        'description': issue.get('body', '')
    }
    issue_data.append(issue_info)

# Save to JSON file
with open('issues.json', 'w') as json_file:
    json.dump(issue_data, json_file, indent=4)

# Save to CSV file
df = pd.DataFrame(issue_data)
df.to_csv('issues.csv', index=False)





#token : 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