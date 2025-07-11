# models/train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import joblib


from imblearn.over_sampling import SMOTE



def load_data():
    X = pd.read_csv("data/X.csv")
    y = pd.read_csv("data/y.csv").values.ravel()
    return X, y



from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, accuracy_score, precision_score, recall_score, f1_score

def evaluate_model(y_true, y_pred, y_prob):
    print("🧪 Confusion Matrix:\n", confusion_matrix(y_true, y_pred))
    print("\n📊 Classification Report:\n", classification_report(y_true, y_pred))
    print(f"🎯 Accuracy: {accuracy_score(y_true, y_pred):.4f}")
    print(f"🎯 Precision: {precision_score(y_true, y_pred):.4f}")
    print(f"🎯 Recall: {recall_score(y_true, y_pred):.4f}")
    print(f"🎯 F1 Score: {f1_score(y_true, y_pred):.4f}")
    print("🔍 ROC AUC Score:", round(roc_auc_score(y_true, y_prob), 4))


def train_models(X, y):
    X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
  )

    # Apply SMOTE only on training data to avoid data leakage
    smote = SMOTE(random_state=42)
    X_train_res, y_train_res = smote.fit_resample(X_train, y_train)
    print(f"✅ After SMOTE: X_train={X_train_res.shape}, y_train={y_train_res.shape}")


    # Logistic Regression
    print("🔹 Training Logistic Regression...")
    lr = LogisticRegression(max_iter=2000)
    lr.fit(X_train_res, y_train_res)

    y_pred_lr = lr.predict(X_test)
    y_prob_lr = lr.predict_proba(X_test)[:, 1]
    print("\n📌 Logistic Regression Evaluation:")
    evaluate_model(y_test, y_pred_lr, y_prob_lr)
    joblib.dump(lr, "models/logistic_model.pkl")

    # Random Forest
    print("\n🔹 Training Random Forest...")
    rf = RandomForestClassifier(
    n_estimators=100,
    class_weight="balanced",  # <-- Important
    random_state=42
    )

    rf.fit(X_train_res, y_train_res)
    y_pred_rf = rf.predict(X_test)
    y_prob_rf = rf.predict_proba(X_test)[:, 1]
    print("\n📌 Random Forest Evaluation:")
    evaluate_model(y_test, y_pred_rf, y_prob_rf)
    joblib.dump(rf, "models/random_forest_model.pkl")

    print("\n✅ Models saved to 'models/' folder.")

      


if __name__ == "__main__":
    X, y = load_data()
    print(f"✅ Loaded data: X={X.shape}, y={y.shape}")
    train_models(X, y)
