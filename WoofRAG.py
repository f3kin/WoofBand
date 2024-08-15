import openai
import os
from dotenv import load_dotenv

# Replace 'your-api-key' with your actual OpenAI API key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Example function to call the OpenAI API
def ask_openai(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
    )
    return response['choices'][0]['message']['content']

if __name__ == "__main__":
    prompt = input("Enter your prompt: ")
    response = ask_openai(prompt)
    print("OpenAI Response:", response)