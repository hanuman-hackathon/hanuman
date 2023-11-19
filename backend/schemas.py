from pydantic import BaseModel
from typing import Literal, Optional
from fastapi import UploadFile
import datetime


class File(BaseModel):
    file_id: int
    blob: Optional[str] = ""
    name: str


class Class(BaseModel):
    class_id: int
    created_at: datetime.datetime
    name: str
    description: Optional[str]
    files: list[File] = []


class GetClassesResponse(BaseModel):
    classes: list[Class]
    error: str = None


class Message(BaseModel):
    role: Literal["system", "assistant", "user"]
    content: str


class ChatPayload(BaseModel):
    class_id: int
    messages: list[Message]


class ChatResponse(BaseModel):
    message: Message
    error: str = None


class CreateClassPayload(BaseModel):
    name: str
    description: Optional[str] = ""


class CreateClassResponse(BaseModel):
    classes: list[Class]


class UploadFilesPayload(BaseModel):
    class_id: int
    files: list[UploadFile] = []


class UploadFilesResponse(BaseModel):
    error: str = None
