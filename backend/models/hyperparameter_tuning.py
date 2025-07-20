# models/hyperparameter_tuning.py
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix

def load_data():
    X = pd.read_csv("data/X.csv")
    y = pd.read_csv("data/y.csv").values.ravel()
    return X, y

def evaluate(y_true, y_pred, y_prob):
    print("\n📊 Classification Report:\n", classification_report(y_true, y_pred))
    print("🧪 Confusion Matrix:\n", confusion_matrix(y_true, y_pred))
    print("🎯 ROC AUC:", round(roc_auc_score(y_true, y_prob), 4))

def tune_random_forest(X_train, y_train):
    param_grid = {
        'n_estimators': [100, 200],
        'max_depth': [None, 10, 20],
        'min_samples_split': [2, 5],
        'min_samples_leaf': [1, 2],
    }

    rf = RandomForestClassifier(
    n_estimators=100,
    class_weight="balanced",  # <-- Important
    random_state=42
    )

    grid = GridSearchCV(rf, param_grid, cv=5, scoring='roc_auc', verbose=1, n_jobs=-1)
    grid.fit(X_train, y_train)

    print("✅ Best RF Params:", grid.best_params_)
    print("📈 Best RF CV ROC AUC:", round(grid.best_score_, 4))
    return grid.best_estimator_

def tune_logistic_regression(X_train, y_train):
    param_grid = {
        'C': [0.01, 0.1, 1, 10],
        'penalty': ['l1', 'l2'],
        'solver': ['liblinear']
    }

    lr = LogisticRegression(max_iter=2000,class_weight='balanced')
    grid = GridSearchCV(lr, param_grid, cv=5, scoring='roc_auc', verbose=1, n_jobs=-1)
    grid.fit(X_train, y_train)

    print("✅ Best LR Params:", grid.best_params_)
    print("📈 Best LR CV ROC AUC:", round(grid.best_score_, 4))
    return grid.best_estimator_

def main():
    X, y = load_data()
    print(f"✅ Loaded data: X={X.shape}, y={y.shape}")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    print("\n🔹 GridSearchCV for Random Forest...")
    best_rf = tune_random_forest(X_train, y_train)
    rf_pred = best_rf.predict(X_test)
    rf_prob = best_rf.predict_proba(X_test)[:, 1]
    evaluate(y_test, rf_pred, rf_prob)
    joblib.dump(best_rf, "models/random_forest_best_model.pkl")

    print("\n🔹 GridSearchCV for Logistic Regression...")
    best_lr = tune_logistic_regression(X_train, y_train)
    lr_pred = best_lr.predict(X_test)
    lr_prob = best_lr.predict_proba(X_test)[:, 1]
    evaluate(y_test, lr_pred, lr_prob)
    joblib.dump(best_lr, "models/logistic_best_model.pkl")

    print("\n✅ Both tuned models saved to 'models/'")

if __name__ == "__main__":
    main()
