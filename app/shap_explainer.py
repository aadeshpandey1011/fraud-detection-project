import shap
import joblib
import pandas as pd

# Load trained logistic model
model = joblib.load("models/logistic_best_model.pkl")

# Function to initialize SHAP explainer
def get_shap_explainer(X_sample):
    explainer = shap.Explainer(model, X_sample)
    return explainer

# Function to explain a single prediction
def explain_prediction(model, explainer, X_instance):
    shap_values = explainer(X_instance)
    return shap_values
