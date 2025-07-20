# # preprocessing/preprocessor.py
# import pandas as pd
# from config.db_config import collection
# from sklearn.preprocessing import LabelEncoder

# def load_data():
#     cursor = collection.find()
#     df = pd.DataFrame(list(cursor))
#     if '_id' in df.columns:
#         df.drop(columns=['_id'], inplace=True)
#     return df




# import json

# def preprocess(df, is_inference=False):
#     drop_cols = ['claimid', 'patientid', 'providerid', 'cluster']
#     df.drop(columns=drop_cols, inplace=True, errors='ignore')
#     df.fillna("NA", inplace=True)

#     if not is_inference:
#         df['claimlegitimacy'] = LabelEncoder().fit_transform(df['claimlegitimacy'])
#         y = df['claimlegitimacy']
#     else:
#         y = None

#     if 'claimlegitimacy' in df.columns:
#         X = df.drop(columns=['claimlegitimacy'])
#     else:
#         X = df

#     X = pd.get_dummies(X, drop_first=True)

#     if is_inference:
#         # 👇 Ensure same columns as training
#         with open("models/feature_columns.json") as f:
#             expected_cols = json.load(f)
#         X = X.reindex(columns=expected_cols, fill_value=0)

#     return X, y


# preprocessing/preprocessor.py

import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from config.db_config import collection
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# categorical_cols = [
#     'DiagnosisCode', 'ProcedureCode', 'PatientGender', 'ProviderSpecialty',
#     'ClaimStatus', 'PatientMaritalStatus', 'PatientEmploymentStatus',
#     'ProviderLocation', 'ClaimType', 'ClaimSubmissionMethod'
# ]

# numerical_cols = ['ClaimAmount', 'PatientAge', 'PatientIncome']

def load_data():
    cursor = collection.find()
    df = pd.DataFrame(list(cursor))
    if '_id' in df.columns:
        df.drop(columns=['_id'], inplace=True)
    return df

def preprocess(is_inference=False, df=None):
    if is_inference:
        pipeline = joblib.load("models/preprocessing_pipeline.pkl")
        X_transformed = pipeline.transform(df)
        return pd.DataFrame(X_transformed, columns=pipeline.get_feature_names_out()), None

    else:
        if df is None:
            df = load_data()

        # 🔧 Normalize column names
        df.columns = df.columns.str.lower()

        drop_cols = ['claimid', 'patientid', 'providerid', 'cluster']
        df.drop(columns=drop_cols, inplace=True, errors='ignore')
        df.fillna("NA", inplace=True)

        # y = df['claimlegitimacy'].map({'Legitimate': 0, 'Fraudulent': 1})
        df['claimlegitimacy'] = df['claimlegitimacy'].str.lower()
        df = df[df['claimlegitimacy'].isin(['legitimate', 'fraudulent', 'fraud'])].copy()
        y = df['claimlegitimacy'].map({'legitimate': 0, 'fraudulent': 1, 'fraud': 1})


        X = df.drop(columns=['claimlegitimacy'])

        numeric_cols = ['claimamount', 'patientage', 'patientincome']

        # ✅ Dynamically find object (string) columns to one-hot encode
        categorical_cols = X.select_dtypes(include=["object"]).columns.tolist()

        print("🔎 All X.columns:", X.columns.tolist())
        print("🧮 numeric_cols:", numeric_cols)
        print("🧩 categorical_cols:", categorical_cols)



        numeric_pipeline = Pipeline([
            ("scaler", StandardScaler())
        ])

        categorical_pipeline = Pipeline([
            ("onehot", OneHotEncoder(handle_unknown="ignore",sparse_output=False))
        ])

        preprocessor = ColumnTransformer([
            ("num", numeric_pipeline, numeric_cols),
            ("cat", categorical_pipeline, categorical_cols)
        ])

        X_transformed = preprocessor.fit_transform(X)
        joblib.dump(preprocessor, "models/preprocessing_pipeline.pkl")
        print("✅ Preprocessing pipeline saved as 'models/preprocessing_pipeline.pkl'")

        print("✅ Class distribution in target (y):")
        print(y.value_counts(dropna=False))

        return pd.DataFrame(X_transformed, columns=preprocessor.get_feature_names_out()), y


def main():
    df = load_data()
    print("✅ Raw data shape:", df.shape)

    X, y = preprocess(df)
    print("✅ After encoding: X =", X.shape, ", y =", y.shape)

    # Save for modeling
    X.to_csv("data/X.csv", index=False)
    y.to_csv("data/y.csv", index=False)
    print("✅ Saved preprocessed data to 'data/X.csv' and 'data/y.csv'")

    print(df.columns)
    print("Printing fraud counts:")
    print(df['claimlegitimacy'].value_counts())


if __name__ == "__main__":
    main()
