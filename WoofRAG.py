import openai
import os

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'your-api-key'

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