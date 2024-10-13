# Thumbnail

## Generate a custom persona cookie

This is a backend fastapi service that generates a persona cookie as a json web token for a given user and inputs such as name, data of birth, and a list of urls.

## How to use

- clone the repo with `git clone https://github.com/k3nnethfrancis/thumbnail.git`
- cd into the project directory with `cd thumbnail`
- install the dependencies with `pip install -r requirements.txt`
- run the service with `python app.py`

## API Reference

Example curl request:

```bash
curl -X POST "http://localhost:8000/generate_persona_cookie" -H "Content-Type: application/json" -d '{"user_data": {"name": "John Doe", "date_of_birth": "1990-01-01"}, "urls": ["https://www.hackernews.com", "https://www.stackoverflow.com"]}'
```



