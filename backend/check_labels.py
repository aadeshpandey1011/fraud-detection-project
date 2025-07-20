# scripts/check_labels_in_db.py
from config.db_config import collection
import pandas as pd

cursor = collection.find()
df = pd.DataFrame(list(cursor))

if '_id' in df.columns:
    df.drop(columns=['_id'], inplace=True)

df.columns = df.columns.str.lower()

print("\n🔎 Unique labels in MongoDB `claimlegitimacy` column:")
print(df['claimlegitimacy'].value_counts(dropna=False))
