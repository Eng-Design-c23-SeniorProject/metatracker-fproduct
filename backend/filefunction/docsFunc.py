from pymongo import MongoClient
from dotenv import load_dotenv
import os
import base64
import io
import openai
import docx

#load values from .env file
load_dotenv()

#MongoDB connection
client = MongoClient(os.getenv('MONGODB_URL'))
db = client['metatracker_db']
collection = db['doc_collection']

#OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

#functions for text extraction and summarization
def extract_text_from_doc(doc_data):
    doc = docx.Document(io.BytesIO(doc_data))
    text_content = "\n".join([paragraph.text for paragraph in doc.paragraphs])
    return text_content

def summarize_text(text):
    #prompt for summarization
    prompt = "Summarize the following text in one paragraph:\n" + text

    #parameters for the summarization request from OpenAI
    parameters = {
        'engine': 'text-davinci-003',
        'prompt': prompt,
        'max_tokens': 100,
        'temperature': 0.3,
        'top_p': 1.0,
        'frequency_penalty': 0.0,
        'presence_penalty': 0.0
    }
    #sending summarization request to OpenAI API
    response = openai.Completion.create(**parameters)

    #extracting the summarized text from the API response
    summary = response.choices[0].text.strip()

    return summary
