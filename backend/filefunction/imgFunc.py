from pymongo import MongoClient
from dotenv import load_dotenv
import os
import base64
from bson import ObjectId
import boto3 #import AWS SDK

#load values from .env file
load_dotenv()

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URL'))
db = client['metatracker_db']
collection = db['img_collection']

#AWS Rekognition keys
AWS_ACCESS_KEY_ID = os.getenv('AWS_REKOG_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_REKOG_SECRET_ACCESS_KEY')

#initialize AWS Rekognition client with your credentials
rekognition_client = boto3.client('rekognition', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

#functions for image handling to databse
def store_image(file_data, filename, sha256_hash):
    try:
        #call the AWS Rekognition API to get image labels
        response = rekognition_client.detect_labels(Image={'Bytes': file_data}, MaxLabels=10)

        #extract and store the label names
        labels = [label['Name'] for label in response['Labels']]

        #store the uploaded image file in MongoDB with SHA-256 hash and labels
        binary_data = base64.b64encode(file_data)
        document = {'name': filename, 'data': binary_data, 'sha256_hash': sha256_hash, 'labels': labels}
        collection.insert_one(document)
    except Exception as e:
        print(f"Error storing image: {str(e)}")

def get_image(file_id):
    document = collection.find_one({'_id': ObjectId(file_id)})
    if document is None:
        return None

    image_data = base64.b64decode(document['data'])
    return image_data

def search_images(query):
    result = []

    #search for image files in the MongoDB collection
    for document in collection.find({'name': {'$regex': query, '$options': 'i'}}):
        result.append({'_id': str(document['_id']), 'name': document['name']})

    return result
