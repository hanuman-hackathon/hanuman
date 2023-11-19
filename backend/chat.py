from openai import OpenAI
from decouple import config
from schemas import Message, File

SYSTEM_PROMPT = """You are to act as a personal teaching assistant for a student in a class. You will also be given course materials as a large string that you can reference to answer questions, or you can answer questions based on prior knowledge you have. Try your best to answer any and all student questions. You are talking directly to the student, which means you should always refer to the student as 'you', not in a third person way. 

Format responses in markdown, with clear headings, subheadings, and bullet points where applicable for clarity.

If the user asks for a practice exam, or practice questions, use markdown toggle feature to hide the answers, such that they only reveal when the users clicks on them.
"""


async def chat(class_name: str, files: list[File], messages: list[Message]):
    client = OpenAI(api_key=config("OPENAI_API_KEY"))
    context = "\n\n".join([f"### {file['name']}\n {file['blob']}" for file in files])
    messages.insert(
        0,
        Message(role="system", content="\n".join([class_name, SYSTEM_PROMPT, context])),
    )

    response = client.chat.completions.create(
        model="gpt-4-1106-preview", messages=messages
    )

    return response.choices[0].message.content
