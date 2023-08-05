from pymongo import MongoClient
from dotenv import load_dotenv
import os
import base64
import PyPDF2
import io
import openai
from bson import ObjectId

#load values from .env file
load_dotenv()

#MongoDB connection
client = MongoClient(os.getenv('MONGODB_URL'))
db = client['metatracker_db']
collection = db['pdf_collection']

#OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

#functions for text extraction and summarization
def extract_text_from_pdf(pdf_data):
    pdf_file = io.BytesIO(pdf_data)
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    num_pages = len(pdf_reader.pages)

    text_content = ""
    for page_num in range(num_pages):
        page = pdf_reader.pages[page_num]
        text_content += page.extract_text()

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
    #send summarization request to OpenAI API
    response = openai.Completion.create(**parameters)

    #extract the summarized text from the API response
    summary = response.choices[0].text.strip()

    return summary
