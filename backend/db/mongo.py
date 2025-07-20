import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()  # Load .env file

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB", "health_insurance_fraud")

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]
users_collection = db.users
