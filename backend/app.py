import os
import sys
from typing import Annotated
import traceback

import uvicorn
from fastapi import FastAPI, UploadFile, Depends, File, Form, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from onboard import onboard
from profile import get_profile

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

app = FastAPI(title="Hanuman", docs_url="/")


# CORS setting
origins = [
    "http://localhost:3000",  # React app
    "http://localhost:8000",  # FastAPI server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.post("/create_class")
# async def create_class():


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=8000,
        reload=True,
    )
