import pandas as pd
from config.db_config import collection
import sys
import os




def clean_column_names(df):
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_").str.replace("-", "_")
    return df

def load_data_to_mongo(csv_path):
    df = pd.read_csv(csv_path)
    df = clean_column_names(df)
    df = df.fillna("NA")  # Replace NaNs

    records = df.to_dict(orient="records")
    collection.insert_many(records)
    print(f"✅ Inserted {len(records)} records into MongoDB.")

if __name__ == "__main__":
    load_data_to_mongo("data/insurance_claims.csv")
