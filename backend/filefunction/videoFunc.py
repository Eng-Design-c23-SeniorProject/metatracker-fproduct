from pymongo import MongoClient
from dotenv import load_dotenv
import os
import base64
from bson import ObjectId
import io

#load values from .env file
load_dotenv()

#MongoDB connection
client = MongoClient(os.getenv('MONGODB_URL'))
db = client['metatracker_db']
collection = db['video_collection']

#functions for video handling
def store_video(file_data, filename):
    #storing the uploaded video file in MongoDB
    binary_data = base64.b64encode(file_data).decode('utf-8')
    document = {'name': filename, 'data': binary_data}
    collection.insert_one(document)

def get_video(file_id):
    document = collection.find_one({'_id': ObjectId(file_id)})
    if document is None:
        return None

    video_data = base64.b64decode(document['data'])
    return video_data

def retrieve_video_data(file_id):
    #retrieving the video file from MongoDB
    document = collection.find_one({'_id': ObjectId(file_id)})
    if document is None:
        return None

    #retrieving the video data from the document
    video_data = document['data']

    #converting the video data from base64 string to bytes
    video_bytes = base64.b64decode(video_data)

    #creating a BytesIO object from the video bytes
    video_file = io.BytesIO(video_bytes)

    return video_file