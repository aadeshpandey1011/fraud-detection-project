from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta


from db.mongo import users_collection
from bson.objectid import ObjectId


# For demonstration, we use an in-memory fake DB
# fake_users_db = {}

# JWT configuration
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# User schema
class User(BaseModel):
    username: str
    email: str
    password: str

# Token schema
class Token(BaseModel):
    access_token: str
    token_type: str


# Utils
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password):
    return pwd_context.hash(password)

# def authenticate_user(username: str, password: str):
#     user = fake_users_db.get(username)
#     if not user or not verify_password(password, user["hashed_password"]):
#         return False
#     return user
async def authenticate_user(username: str, password: str):
    user = await users_collection.find_one({"username": username})
    if not user or not verify_password(password, user["hashed_password"]):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Register new user

# @router.post("/register")
# async def register(user: User):
#     existing_user = await users_collection.find_one({"username": user.username})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Username already registered")

#     hashed = hash_password(user.password)
#     new_user = {
#         "username": user.username,
#         "email": user.email,
#         "hashed_password": hashed
#     }

#     result = await users_collection.insert_one(new_user)
#     return {"msg": "User registered successfully", "id": str(result.inserted_id)}


@router.post("/register")
async def register_user(user: User):
    existing = await users_collection.find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = pwd_context.hash(user.password)
    user_dict = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password
    }

    result = await users_collection.insert_one(user_dict)
    return {"message": "User registered", "user_id": str(result.inserted_id)}








# Login to get token
@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}








from fastapi import Security
from fastapi.security import OAuth2PasswordBearer
from fastapi import status

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     user = fake_users_db.get(username)
#     if user is None:
#         raise credentials_exception
#     return user
# ✅ Modify get_current_user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await users_collection.find_one({"username": username})
    if user is None:
        raise credentials_exception
    return user

# Protected route
@router.get("/me")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return {"username": current_user["username"]}
