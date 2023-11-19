import os
import sys
import traceback
import uvicorn
from typing import List

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

from crud import get_classes, create_class, create_files
from chat import chat

from schemas import (
    CreateClassPayload,
    CreateClassResponse,
    GetClassesResponse,
    UploadFilesResponse,
    ChatPayload,
    ChatResponse,
)

sys.path.append(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
)

app = FastAPI(title="Hanuman", docs_url="/")


# CORS setting
origins = [
    "http://localhost:5173",  # React app
    "http://localhost:8000",  # FastAPI server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/classes", response_model=GetClassesResponse)
async def get_classes_handler():
    try:
        classes = await get_classes()

        return {"classes": classes}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}


@app.post("/upload_files", response_model=UploadFilesResponse)
async def upload_files_handler(
    class_id: int = Form(...),
    files: List[UploadFile] = File(...),
):
    try:
        await create_files(class_id, files)

        return {}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}


@app.post("/chat", response_model=ChatResponse)
async def chat_handler(payload: ChatPayload):
    try:
        message = await chat(payload.message)

        return {"message": {"role": "assistant", "content": message}}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}


@app.post("/create_class", response_model=CreateClassResponse)
async def create_class_handler(payload: CreateClassPayload):
    try:
        classes = await create_class(payload.name, payload.description)

        return {"classes": classes}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}


if __name__ == "__main__":
    print("running")
    uvicorn.run(
        "app:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=8000,
        reload=True,
    )
