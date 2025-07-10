# eda/eda_analysis.py
from config.db_config import collection
import pandas as pd


from ydata_profiling import ProfileReport


def load_data():
    cursor = collection.find()
    df = pd.DataFrame(list(cursor))
    print("✅ Loaded", len(df), "records from MongoDB")
    return df

df = load_data()

print(df.head(20))
print(df.info())
print(df.columns.tolist())
print("dataframe descryption:\n",df.describe())

if '_id' in df.columns:
    df.drop(columns=['_id'], inplace=True)

print(df.isnull().sum())
print("\nMissing values (%):")
print((df.isnull().mean() * 100).round(2))


numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
categorical_cols = df.select_dtypes(include=['object']).columns.tolist()

print("Numerical:", numerical_cols)
print("Categorical:", categorical_cols)




import seaborn as sns
import matplotlib.pyplot as plt

corr = df[numerical_cols].corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap='coolwarm')
plt.title("📈 Correlation Heatmap")
plt.show()



# Generate profile report
profile = ProfileReport(df, title="📊 Insurance Fraud EDA Report", explorative=True)
profile.to_file("reports/eda_profile_report.html")

print("✅ EDA report saved to 'reports/eda_profile_report.html'")