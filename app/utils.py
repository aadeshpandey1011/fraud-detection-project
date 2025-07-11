# app/utils.py
import pandas as pd
import joblib


def load_model():
    return joblib.load("models/logistic_best_model.pkl")


def preprocess_input(df):
    # Minimal preprocessing assuming columns match training
    df.fillna("NA", inplace=True)
    df = pd.get_dummies(df, drop_first=True)
    return df
