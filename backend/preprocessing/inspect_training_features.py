import pandas as pd
import json

X = pd.read_csv("data/X.csv")
print("🔍 X shape:", X.shape)
print("📌 Sample columns from X:")
print(X.columns[:30].tolist())  # First 30 columns

with open("models/feature_columns.json") as f:
    feature_cols = json.load(f)

print("\n📦 Total features in feature_columns.json:", len(feature_cols))
print("🔍 Match? ", list(X.columns) == feature_cols)
