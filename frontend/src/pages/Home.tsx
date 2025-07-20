// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import About from "./Utilities/About";
// import { isAuthenticated } from "../utils/auth";

// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate("/dashboard/overview", { replace: true });
//     }
//   }, [navigate]);

//   return <About />;
// };

// export default Home;







// import About from './Utilities/About';

// const Home = () => {
//   return <About />;
// };

// export default Home;













// // src/pages/Home.tsx
// const Home = () => {
//     console.log("✅ Home.tsx loaded");

//   return <h1 style={{ color: "white" }}>🏠 TEMP Home Page</h1>;
// };

// export default Home;


















// src/pages/Home.tsx
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  if (isAuthenticated()) {
    navigate("/dashboard/overview");
  }

  return (
    <div style={{ textAlign: "center", paddingTop: "5rem", color: "white" }}>
      <Title style={{ color: "white" }}>🏠 Welcome to Health Insurance Fraud Detection</Title>
      <Paragraph style={{ fontSize: "18px", maxWidth: 600, margin: "auto", color: "white" }}>
        This app helps detect fraudulent insurance claims using machine learning.
        Log in to start predicting and analyzing insurance data.
      </Paragraph>
      <Button type="primary" size="large" style={{ marginTop: 24 }} onClick={() => navigate("/login")}>
        Go to Login
      </Button>
    </div>
  );
};

export default Home;




