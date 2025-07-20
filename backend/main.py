# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.predict import router as predict_router
from routes.auth import router as auth_router  # ✅ Fix here

app = FastAPI(title="Health Insurance Fraud API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)






app.include_router(predict_router)
app.include_router(auth_router)  # ✅ This must point to `auth.router`

@app.on_event("startup")
async def connect_to_db():
    print("✅ MongoDB connected!")