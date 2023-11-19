from openai import OpenAI
from decouple import config
from schemas import Message


def chat(class_id: str, messages: list[Message]):
    client = OpenAI(api_key=config("OPENAI_API_KEY"))
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {
                "role": "user",
                "content": "Hello, I'm a student.",
            }
        ],
    )

    return response.choices[0].message.content
