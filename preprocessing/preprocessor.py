# preprocessing/preprocessor.py
import pandas as pd
from config.db_config import collection
from sklearn.preprocessing import LabelEncoder

def load_data():
    cursor = collection.find()
    df = pd.DataFrame(list(cursor))
    if '_id' in df.columns:
        df.drop(columns=['_id'], inplace=True)
    return df

def preprocess(df):
    # Step 1: Drop columns
    drop_cols = ['claimid', 'patientid', 'providerid', 'cluster']
    df.drop(columns=drop_cols, inplace=True, errors='ignore')

    # Step 2: Handle missing values
    df.fillna("NA", inplace=True)

    # Step 3: Encode binary label column
    label_enc = LabelEncoder()
    df['claimlegitimacy'] = label_enc.fit_transform(df['claimlegitimacy'])

    # Step 4: Separate target
    y = df['claimlegitimacy']
    X = df.drop(columns=['claimlegitimacy'])

    # Step 5: Encode categorical features (get_dummies)
    X = pd.get_dummies(X, drop_first=True)

    return X, y

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
