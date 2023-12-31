from decouple import config
import io

from fastapi import UploadFile
from PyPDF2 import PdfReader

from supabase_util import supabase, cursor, conn


def get_resume_content(pdf_content):
    reader = PdfReader(io.BytesIO(pdf_content))

    file_contents = ""
    for page in reader.pages:
        file_contents += page.extract_text().replace("\u0000", "")

    return file_contents


async def get_classes():
    classes_data, _ = (
        supabase.table("classes")
        .select("class_id:id, created_at, name, description, files (id, name)")
        .execute()
    )

    return classes_data[1]


async def create_class(name: str, description: str):
    _, _ = (
        supabase.table("classes")
        .insert(
            {
                "name": name,
                "description": description,
            }
        )
        .execute()
    )

    return await get_classes()


async def create_files(class_id: str, files: list[UploadFile]):
    for file in files:
        raw_file = file.file.read()
        blob = get_resume_content(raw_file)

        _, _ = (
            supabase.table("files")
            .insert(({"name": file.filename, "class_id": class_id, "blob": blob}))
            .execute()
        )


async def get_class_name(class_id: str):
    class_data, _ = (
        supabase.table("classes").select("name").eq("id", class_id).execute()
    )

    return class_data[1][0]["name"]


async def get_files(class_id: str):
    files_data, _ = (
        supabase.table("files")
        .select("file_id:id, name, blob")
        .eq("class_id", class_id)
        .execute()
    )

    return files_data[1]
