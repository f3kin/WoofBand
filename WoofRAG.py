from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

file = open("ContextPrompt.txt", "r")
context_prompt = file.read()
while True:
    prompt = input("\nWhat do you want to ask your dog ?: \n")
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": context_prompt},
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    print(completion.choices[0].message.content + '\n')