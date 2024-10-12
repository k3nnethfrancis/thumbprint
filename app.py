"""
FastAPI endpoint to generate a persona cookie.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from generator import generate_persona_cookie

app = FastAPI()

class UserInput(BaseModel):
    user_data: dict
    urls: List[str]

@app.post("/generate_persona_cookie")
async def generate_cookie(user_input: UserInput):
    try:
        persona_cookie = generate_persona_cookie(user_input.user_data, user_input.urls)
        return {"persona_cookie": persona_cookie}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)