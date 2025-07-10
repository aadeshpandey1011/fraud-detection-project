# app/app.py
# import streamlit as st
# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# import seaborn as sns
# from app.utils import load_model, preprocess_input


# from dotenv import load_dotenv
# load_dotenv()



# st.set_page_config(page_title="Insurance Fraud Detector 💼", layout="wide")

# # Load model
# model = load_model()

# # Dark Theme Styling
# st.markdown("""
#     <style>
#     body {
#         background-color: #121212;
#         color: #ffffff;
#     }
#     .stApp {
#         background-color: #1e1e1e;
#     }
#     </style>
# """, unsafe_allow_html=True)

# st.title("🔍 Insurance Fraud Detection System")
# st.subheader("Predict claim legitimacy using AI")

# # Tabs for Input Options
# tab1, tab2 = st.tabs(["📥 Manual Entry", "📁 File Upload"])

# with tab1:
#     st.markdown("### ✍️ Enter Claim Details")
#     with st.form(key="input_form"):
#         claimamount = st.number_input("Claim Amount", min_value=0.0)
#         patientage = st.number_input("Patient Age", min_value=0)
#         patientincome = st.number_input("Patient Income", min_value=0.0)
#         patientgender = st.selectbox("Gender", ["Male", "Female"])
#         claimstatus = st.selectbox("Claim Status", ["Submitted", "Approved", "Denied"])
#         providerspecialty = st.selectbox("Provider Specialty", ["Cardiology", "General", "Orthopedic"])
#         claimtype = st.selectbox("Claim Type", ["Inpatient", "Outpatient"])
#         claimsubmissionmethod = st.selectbox("Submission Method", ["Online", "Paper"])
#         diagnosiscode = st.text_input("Diagnosis Code")
#         procedurecode = st.text_input("Procedure Code")
#         providerlocation = st.text_input("Provider Location")
#         patientmaritalstatus = st.selectbox("Marital Status", ["Single", "Married"])
#         patientemploymentstatus = st.selectbox("Employment", ["Employed", "Unemployed"])

#         submit = st.form_submit_button("Predict Fraud")

#     if submit:
#         input_df = pd.DataFrame([{
#             "claimamount": claimamount,
#             "patientage": patientage,
#             "patientincome": patientincome,
#             "patientgender": patientgender,
#             "claimstatus": claimstatus,
#             "providerspecialty": providerspecialty,
#             "claimtype": claimtype,
#             "claimsubmissionmethod": claimsubmissionmethod,
#             "diagnosiscode": diagnosiscode,
#             "procedurecode": procedurecode,
#             "providerlocation": providerlocation,
#             "patientmaritalstatus": patientmaritalstatus,
#             "patientemploymentstatus": patientemploymentstatus
#         }])

#         X_input = preprocess_input(input_df)
#         X_input = X_input.reindex(columns=model.feature_names_in_, fill_value=0)

#         pred = model.predict(X_input)[0]
#         prob = model.predict_proba(X_input)[0][1]

#         st.markdown(f"### 🧠 Prediction: {'🚨 Fraudulent' if pred == 1 else '✅ Legitimate'}")
#         st.markdown(f"#### 🔎 Probability of Fraud: `{round(prob * 100, 2)}%`")

#         # Bar chart for probability
#         fig, ax = plt.subplots()
#         ax.bar(["Fraud", "Legit"], [prob, 1 - prob], color=["#e74c3c", "#2ecc71"])
#         st.pyplot(fig)

# with tab2:
#     st.markdown("### 📁 Upload CSV File")

#     file = st.file_uploader("Upload claim data", type=["csv"])
#     if file:
#         data = pd.read_csv(file)
#         st.dataframe(data.head())

#         processed = preprocess_input(data)
#         processed = processed.reindex(columns=model.feature_names_in_, fill_value=0)

#         preds = model.predict(processed)
#         probs = model.predict_proba(processed)[:, 1]

#         data["Fraud_Prediction"] = preds
#         data["Fraud_Probability"] = np.round(probs * 100, 2)

#         st.markdown("### 🧾 Prediction Output")
#         st.dataframe(data[["Fraud_Prediction", "Fraud_Probability"]])

#         # Show fraud distribution
#         fig, ax = plt.subplots()
#         sns.countplot(x="Fraud_Prediction", data=data, palette=["#2ecc71", "#e74c3c"], ax=ax)
#         ax.set_xticklabels(["Legit", "Fraud"])
#         st.pyplot(fig)











# app/app.py
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from app.utils import load_model, preprocess_input
from dotenv import load_dotenv

load_dotenv()

st.set_page_config(page_title="Insurance Fraud Detector 💼", layout="wide")

# Load model
model = load_model()

# 🔧 Dark Theme Styling
st.markdown("""
    <style>
        .stApp {
            background-color: #121212;
            color: white;
        }
        input, textarea, select, .css-1cpxqw2 {
            background-color: #2e2e2e !important;
            color: white !important;
        }
    </style>
""", unsafe_allow_html=True)

# 🏷️ Title and Header
st.title("🔍 Insurance Fraud Detection System")
st.subheader("Predict claim legitimacy using AI")

# 📌 Tabs
tab1, tab2 = st.tabs(["📥 Manual Entry", "📁 File Upload"])

# 📥 Manual Entry Tab
with tab1:
    st.markdown("### ✍️ Enter Claim Details")
    with st.form(key="input_form"):
        claimamount = st.number_input("Claim Amount", min_value=0.0)
        patientage = st.number_input("Patient Age", min_value=0)
        patientincome = st.number_input("Patient Income", min_value=0.0)
        patientgender = st.selectbox("Gender", ["Male", "Female"])
        claimstatus = st.selectbox("Claim Status", ["Submitted", "Approved", "Denied"])
        providerspecialty = st.selectbox("Provider Specialty", ["Cardiology", "General", "Orthopedic"])
        claimtype = st.selectbox("Claim Type", ["Inpatient", "Outpatient"])
        claimsubmissionmethod = st.selectbox("Submission Method", ["Online", "Paper"])
        diagnosiscode = st.text_input("Diagnosis Code")
        procedurecode = st.text_input("Procedure Code")
        providerlocation = st.text_input("Provider Location")
        patientmaritalstatus = st.selectbox("Marital Status", ["Single", "Married"])
        patientemploymentstatus = st.selectbox("Employment", ["Employed", "Unemployed"])

        submit = st.form_submit_button("🔮 Predict Fraud")

    if submit:
        input_df = pd.DataFrame([{
            "claimamount": claimamount,
            "patientage": patientage,
            "patientincome": patientincome,
            "patientgender": patientgender,
            "claimstatus": claimstatus,
            "providerspecialty": providerspecialty,
            "claimtype": claimtype,
            "claimsubmissionmethod": claimsubmissionmethod,
            "diagnosiscode": diagnosiscode,
            "procedurecode": procedurecode,
            "providerlocation": providerlocation,
            "patientmaritalstatus": patientmaritalstatus,
            "patientemploymentstatus": patientemploymentstatus
        }])

        X_input = preprocess_input(input_df)
        X_input = X_input.reindex(columns=model.feature_names_in_, fill_value=0)

        pred = model.predict(X_input)[0]
        prob = model.predict_proba(X_input)[0][1]

        st.markdown(f"### 🧠 Prediction: {'🚨 Fraudulent' if pred == 1 else '✅ Legitimate'}")
        st.markdown(f"#### 🔎 Probability of Fraud: `{round(prob * 100, 2)}%`")

        # 📊 Confidence Bar Chart
        fig, ax = plt.subplots()
        ax.bar(["Legit", "Fraud"], [1 - prob, prob], color=["#2ecc71", "#e74c3c"])
        ax.set_ylabel("Confidence")
        ax.set_title("Prediction Confidence")
        st.pyplot(fig)

# 📁 File Upload Tab
with tab2:
    st.markdown("### 📁 Upload CSV File")

    file = st.file_uploader("Upload claim data", type=["csv"])
    if file:
        data = pd.read_csv(file)
        st.dataframe(data.head())

        processed = preprocess_input(data)
        processed = processed.reindex(columns=model.feature_names_in_, fill_value=0)

        preds = model.predict(processed)
        probs = model.predict_proba(processed)[:, 1]

        data["Fraud_Prediction"] = preds
        data["Fraud_Probability"] = np.round(probs * 100, 2)
        data["Fraud_Label"] = data["Fraud_Prediction"].map({0: "✅ Legit", 1: "🚨 Fraud"})

        st.markdown("### 🧾 Prediction Output")
        st.dataframe(data[["Fraud_Label", "Fraud_Probability"]])

        # 📈 Fraud Distribution Chart
        fig, ax = plt.subplots()
        sns.countplot(x="Fraud_Prediction", data=data, palette=["#2ecc71", "#e74c3c"], ax=ax)
        ax.set_xticklabels(["Legit", "Fraud"])
        ax.set_ylabel("Number of Records")
        ax.set_title("Fraud Prediction Distribution")
        st.pyplot(fig)

        # 💾 Download Button
        csv_out = data.to_csv(index=False)
        st.download_button(
            label="📥 Download Predictions CSV",
            data=csv_out,
            file_name="fraud_predictions.csv",
            mime="text/csv"
        )
