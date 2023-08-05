from pymongo import MongoClient
from dotenv import load_dotenv
import os
import base64
import openai
from bson import ObjectId

#load values from .env file
load_dotenv()

#MongoDB connection
client = MongoClient(os.getenv('MONGODB_URL'))
db = client['metatracker_db']
collection = db['text_collection']

#OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

#function for storing text files
def store_text_file(file_data, filename, sha256_hash):
    #store the uploaded text file in MongoDB
    text_data = base64.b64encode(file_data).decode('utf-8')
    document = {'name': filename, 'data': text_data, 'sha256_hash': sha256_hash}  # Database model
    collection.insert_one(document)

def extract_text_from_text_file(file_id):
    document = collection.find_one({'_id': ObjectId(file_id)})
    if document is None:
        return None

    text_data = base64.b64decode(document['data']).decode('utf-8')
    return text_data

def summarize_text(text):
    #prompt for summarization
    prompt = "Summarize the following text in one paragraph:\n" + text

    #parameters for the summarization request from OpenAI
    parameters = {
        'engine': 'text-davinci-003',
        'prompt': prompt,
        'max_tokens': 500,
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
