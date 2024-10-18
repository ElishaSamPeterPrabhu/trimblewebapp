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

def fetch_issues(api_url, headers, params):
    all_issues = []
    page = 1
    while True:
        response = requests.get(api_url, headers=headers, params={**params, 'page': page})
        if response.status_code != 200:
            raise Exception(f"Error fetching issues: {response.status_code}\n{response.json().get('message')}")
        issues = response.json()
        if not issues:
            break
        all_issues.extend(issues)
        page += 1
    return all_issues

# Filter out pull requests from issues
filtered_issues = [issue for issue in all_issues if 'pull_request' not in issue]

# Function to fetch comments for a given issue
def fetch_comments(issue_number):
    comments_url = f'https://api.github.com/repos/{GITHUB_REPO}/issues/{issue_number}/comments'
    comments = []
    page = 1
    while True:
        response = requests.get(comments_url, headers=headers, params={'per_page': 100, 'page': page})
        if response.status_code != 200:
            raise Exception(f"Error fetching comments: {response.status_code}\n{response.json().get('message')}")
        page_comments = response.json()
        if not page_comments:
            break
        comments.extend(page_comments)
        page += 1
    return comments

# Extract relevant details and fetch comments
def main():
    all_issues = fetch_issues(API_URL, headers, params)
    filtered_issues = [issue for issue in all_issues if 'pull_request' not in issue]

    issue_data = []
    for idx, issue in enumerate(filtered_issues, start=1):
        # Print progress
        print(f"Processing issue {idx}/{len(filtered_issues)}: Issue #{issue['number']} - still running...")

        comments = fetch_comments(issue['number'])
        comment_bodies = [comment['body'] for comment in comments]
        issue_info = {
            'id': issue['id'],
            'number': issue['number'],
            'title': issue['title'],
            'labels': [label['name'] for label in issue['labels']],
            'description': issue.get('body', ''),
            'comments': comment_bodies
        }
        issue_data.append(issue_info)

    # Save to JSON file
    with open('issues_with_comments.json', 'w') as json_file:
        json.dump(issue_data, json_file, indent=4)

    # Save to CSV file
    df = pd.DataFrame(issue_data)
    df.to_csv('issues_with_comments.csv', index=False)

if __name__ == "__main__":
    main()




#token : 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