# backend/routes/predict.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import os
import json

from preprocessing.preprocessor import preprocess

router = APIRouter()
model = joblib.load("models/logistic_best_model.pkl")
pipeline = joblib.load("models/preprocessing_pipeline.pkl")
from datetime import datetime
# Load model once
# model_path = os.path.join("models", "logistic_best_model.pkl")
# model = joblib.load(model_path)
# with open(os.path.join("models", "feature_columns.json")) as f:
#     expected_cols = json.load(f)

# Pydantic schema for input


class FraudInput(BaseModel):
    claimamount: float
    diagnosiscode: str
    procedurecode: str
    patientage: int
    patientgender: str
    providerspecialty: str
    claimstatus: str
    patientincome: float
    patientmaritalstatus: str
    patientemploymentstatus: str
    providerlocation: str
    claimtype: str
    claimsubmissionmethod: str

# @router.post("/predict")
# async def predict_fraud(data: FraudInput):
#     try:
#         input_dict = data.dict()
#         df = pd.DataFrame([input_dict])
#         df['claimlegitimacy'] = 'Legitimate'  # Dummy column for compatibility

#         # 🔄 Transform using saved pipeline
#         X_transformed, _ = preprocess(is_inference=True, df=df)

#         # ✅ Reindex to match training features
#         with open("models/feature_columns.json", "r") as f:
#             expected_cols = json.load(f)

#         X_transformed = X_transformed.reindex(columns=expected_cols, fill_value=0)

#         print("📦 Final X for prediction:")
#         print(X_transformed.head())
#         print("🔢 Row sum (should NOT be 0):", X_transformed.sum(axis=1))

#         # 🔮 Prediction
#         pred_prob = model.predict_proba(X_transformed)[0][1]
#         pred_class = model.predict(X_transformed)[0]

#         if X_transformed.sum(axis=1).iloc[0] == 0:
#             raise HTTPException(status_code=400, detail="Input resulted in zeroed features. Possibly missing or unmatched values.")

#         result = {
#             "prediction": "Fraudulent" if pred_class == 1 else "Legitimate",
#             "probability": round(pred_prob, 2)
#         }
#         return result

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict")
async def predict_fraud(data: FraudInput):
    try:
        input_dict = data.dict()

        print("🟢 Raw input received:", input_dict)  # 🔍 Log 1

        df = pd.DataFrame([input_dict])
        df['claimdate'] = datetime.today().strftime('%Y-%m-%d')  # or any valid dummy date

        df['claimlegitimacy'] = 'Legitimate'  # Dummy column for compatibility

        X_transformed, _ = preprocess(is_inference=True, df=df)

        with open("models/feature_columns.json", "r") as f:
            expected_cols = json.load(f)

        X_transformed = X_transformed.reindex(columns=expected_cols, fill_value=0)

        print("📦 Final X for prediction:", X_transformed.head().to_dict())  # 🔍 Log 2
        print("🔢 Row sum:", X_transformed.sum(axis=1).iloc[0])  # 🔍 Log 3

        if X_transformed.sum(axis=1).iloc[0] == 0:
            raise HTTPException(status_code=400, detail="Input resulted in zeroed features. Possibly missing or unmatched values.")

        pred_prob = model.predict_proba(X_transformed)[0][1]
        pred_class = model.predict(X_transformed)[0]

        result = {
            "prediction": "Fraudulent" if pred_class == 1 else "Legitimate",
            "probability": round(pred_prob, 2)
        }
        return result

    except Exception as e:
        import traceback
        print("❌ Full Error Trace:")
        traceback.print_exc()  # 🔍 Log full traceback
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    









from fastapi import File, UploadFile, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
import io

# Token auth for security (optional — already setup)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/bulk-predict")
async def bulk_predict(file: UploadFile = File(...), token: str = Depends(oauth2_scheme)):
    try:
        # Load uploaded CSV file
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        if df.empty:
            raise HTTPException(status_code=400, detail="CSV file is empty.")

        # Add dummy column for compatibility
        df['claimlegitimacy'] = 'Legitimate'
        df['claimdate'] = datetime.today().strftime('%Y-%m-%d')

        # Preprocess
        X, _ = preprocess(is_inference=True, df=df)


        with open("models/feature_columns.json", "r") as f:
            expected_cols = json.load(f)

        X_input = X.reindex(columns=expected_cols, fill_value=0)


        print("\n🧠 Inference-time X.columns:")
        print(list(X.columns))



        print("📦 Preprocessed X (from preprocess):")
        print(X.head())

        print("\n📋 Final X_input (after reindex):")
        X_input = X.reindex(columns=expected_cols, fill_value=0)
        print(X_input.head())

        print("\n🔢 Row-wise sum (to check if all zeros):")
        print(X_input.sum(axis=1))

        # Predict
        probas = model.predict_proba(X_input)[:, 1]
        preds = model.predict(X_input)

        # Return with optional claim IDs or row numbers
        results = [
            {
                "claim_id": int(df.index[i]) + 1,
                "prediction": "Fraudulent" if int(preds[i]) == 1 else "Legitimate",
                "probability": round(float(probas[i]), 2)
            }
            for i in range(len(preds))
        ]

        return {"predictions": results}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Bulk prediction failed: {str(e)}")


