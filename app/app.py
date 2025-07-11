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
from utils import load_model, preprocess_input
from dotenv import load_dotenv

load_dotenv()
model = load_model()
st.set_page_config(page_title="Insurance Fraud Detector 💼", layout="wide")

# Custom CSS styling for modern look
st.markdown("""
    <style>
        html, body, .stApp {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', sans-serif;
            color: #212529;
        }
        .hero {
            padding: 2rem;
            background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
            color: white;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .form-container {
            background-color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: auto;
        }
        .stButton>button {
            background-color: #4b6cb7;
            color: white;
        }
        .title {
            font-size: 2.5rem;
            font-weight: bold;
        }
        .subtitle {
            font-size: 1.2rem;
            margin-top: 0.5rem;
        }
    </style>
""", unsafe_allow_html=True)

# 📌 Hero Banner
st.markdown("""
<div class="hero">
    <div class="title">🔍 Insurance Fraud Detection System</div>
    <div class="subtitle">
        An AI-powered solution to detect fraudulent health insurance claims using machine learning.
        Upload your insurance claim data or manually enter it to check legitimacy and visualize the probability of fraud in real time.
    </div>
</div>
""", unsafe_allow_html=True)


# Project Overview Section
st.markdown("## 📘 Project Overview")
st.markdown("""
The **Insurance Fraud Detection System** is a machine learning-powered web app designed to intelligently predict the likelihood of fraud in health insurance claims. 
Leveraging data analysis, statistical models, and domain-specific features, this tool helps insurance professionals detect anomalies in real-time.

### 🔧 Key Capabilities:
- Predict if a claim is **fraudulent** or **legitimate** based on user inputs or bulk CSV files.
- Confidence-based visualization for better understanding of predictions.
- Modern UI and clean experience using Streamlit.
- Future-ready for **authentication**, **explainability**, and **full-stack migration**.

### 🚀 Powered By:
- **Python** for scripting
- **Machine Learning** models for classification
- **Streamlit** for UI and interactivity
- **Matplotlib/Seaborn** for visuals
""")

# Add relevant image (you can use a URL or local image path)
st.image("https://www.shutterstock.com/shutterstock/photos/2543432193/display_1500/stock-photo-ai-machine-learning-and-neural-networks-the-robot-s-hand-touches-the-human-hand-2543432193.jpg", caption="Python + ML + Streamlit = Intelligent Detection")


# 📥 Tabs
tab1, tab2 = st.tabs(["✍️ Manual Entry", "📁 File Upload"])

# 📝 Manual Form Entry
with tab1:
    with st.container():
        st.markdown("<div class='form-container'>", unsafe_allow_html=True)
        st.subheader("Enter Claim Details")

        with st.form("input_form"):
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

        st.markdown("</div>", unsafe_allow_html=True)

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

            st.success(f"🧠 Prediction: {'🚨 Fraudulent' if pred == 1 else '✅ Legitimate'}")
            st.markdown(f"#### 🔎 Probability of Fraud: `{round(prob * 100, 2)}%`")

            # 📊 Confidence Chart
            fig, ax = plt.subplots()
            ax.bar(["Legit", "Fraud"], [1 - prob, prob], color=["#2ecc71", "#e74c3c"])
            ax.set_ylabel("Confidence")
            ax.set_title("Prediction Confidence")
            st.pyplot(fig)

# 📁 File Upload
with tab2:
    st.subheader("Upload CSV File")
    file = st.file_uploader("Upload insurance claim data", type=["csv"])
    if file:
        data = pd.read_csv(file)
        st.dataframe(data.head())

        processed = preprocess_input(data)
        processed = processed.reindex(columns=model.feature_names_in_, fill_value=0)

        preds = model.predict(processed)
        probs = model.predict_proba(processed)[:, 1]

        data["Fraud_Prediction"] = preds
        data["Fraud_Probability"] = np.round(probs * 100, 2)
        data["Label"] = data["Fraud_Prediction"].map({0: "✅ Legit", 1: "🚨 Fraud"})

        st.subheader("🧾 Prediction Output")
        st.dataframe(data[["Label", "Fraud_Probability"]])

        # Chart
        fig, ax = plt.subplots()
        sns.countplot(x="Fraud_Prediction", data=data, palette=["#2ecc71", "#e74c3c"], ax=ax)
        ax.set_xticklabels(["Legit", "Fraud"])
        ax.set_ylabel("Records")
        ax.set_title("Prediction Distribution")
        st.pyplot(fig)

        # Download Button
        csv_out = data.to_csv(index=False)
        st.download_button(
            label="📥 Download CSV Results",
            data=csv_out,
            file_name="fraud_predictions.csv",
            mime="text/csv"
        )
