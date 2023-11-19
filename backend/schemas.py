from pydantic import BaseModel
from typing import Literal
from fastapi import UploadFile
import datetime


class Class(BaseModel):
    class_id: int
    created_at: datetime.datetime
    name: str
    description: str
    files: list[str] = []


class GetClassesResponse(BaseModel):
    classes: list[Class]
    error: str = None


class Message(BaseModel):
    role: Literal["assistant", "user"]
    content: str


class ChatPayload(BaseModel):
    class_id: int
    messages: list[Message]


class ChatResponse(BaseModel):
    message: Message
    error: str = None


class CreateClassPayload(BaseModel):
    name: str
    description: str


class CreateClassResponse(BaseModel):
    classes: list[Class]


class UploadFilesPayload(BaseModel):
    class_id: int
    files: list[UploadFile] = []


class UploadFilesResponse(BaseModel):
    error: str = None
