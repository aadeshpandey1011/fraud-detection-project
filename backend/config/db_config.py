from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "insuranceDB"
COLLECTION_NAME = "claims"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]
