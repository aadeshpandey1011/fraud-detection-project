// // src/App.tsx
// import { Layout } from 'antd';
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Overview from './pages/Dashboard/Overview';
// import FraudTrends from './pages/Dashboard/FraudTrends';

// const { Header, Sider, Content } = Layout;

// function App() {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider width={220} theme="dark">
//         <Sidebar />
//       </Sider>

//       <Layout style={{ flex: 1 }}>
//         <Header style={{ padding: 0, background: '#001529' }}>
//           <Navbar />
//         </Header>

//         <Content
//           style={{
//             margin: '16px',
//             padding: '24px',
//             minHeight: 'calc(100vh - 112px)',
//             background: '#141414',
//             borderRadius: '12px',
//             color: 'white',
//             overflowX: 'auto',
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<Overview />} />
//             <Route path="/dashboard/trends" element={<FraudTrends />} />
//           </Routes>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default App;









// // src/App.tsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Overview from "./pages/Dashboard/Overview";

// const App = () => {
//   console.log("✅ App.tsx loaded");
//   return (
    
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard/overview" element={<Overview />} />
//       </Routes>
    
//   );
// };

// export default App;

















// src/App.tsx
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Routes>
//   );
// };

// export default App;













// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Overview from "./pages/Dashboard/Overview";

import FraudTrends from "./pages/Dashboard/FraudTrends";
import FraudHistory from "./pages/Dashboard/FraudHistory"; // ✅ Import this if not already
import SingleEntry from "./pages/Predict/SingleEntry";
import BulkUpload from "./pages/Predict/BulkUpload";



import About from './pages/Utilities/About';
import FAQ from './pages/Utilities/FAQ';
import Contact from './pages/Utilities/Contact';
import Register from './pages/Auth/Register';




import { message } from 'antd';

// Optional: Configure global toast behavior
message.config({
  top: 80, // distance from top in px
  duration: 2.5, // auto-dismiss after 2.5s
  maxCount: 3, // prevent stacking too many
});





const { Sider, Header, Content } = Layout;

const App = () => {
  console.log("✅ App.tsx with Navbar loaded");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} theme="dark">
        <Sidebar />
      </Sider>

      <Layout>
        <Header
          style={{
            position: "fixed",         // ✅ Fix the header
            top: 0,
            zIndex: 100,
            width: "100%",
            padding: 0,
            background: "#001529",
          }}
        >
          <Navbar />
        </Header>


        <Content
          style={{
            margin: "16px",
            padding: "24px",
            background: "#141414",
            color: "white",
            minHeight: "calc(100vh - 112px)",
            overflowX: "auto",

            paddingTop: "64px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)"

          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />

            
            <Route path="/register" element={<Register />} />



            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/overview" element={<Overview />} />
            <Route path="/dashboard/trends" element={<FraudTrends />} />
            <Route path="/dashboard/history" element={<FraudHistory />} />
            <Route path="/predict/single" element={<SingleEntry />} />
            <Route path="/predict/bulk" element={<BulkUpload />} />

            <Route path="/login" element={<Login />} />
            <Route path="/utilities/about" element={<About />} />
            <Route path="/utilities/faq" element={<FAQ />} />

            <Route path="/utilities/contact" element={<Contact />} />



          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;




















// import { Layout } from 'antd';
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Overview from './pages/Dashboard/Overview';
// import FraudTrends from './pages/Dashboard/FraudTrends';
// import FraudHistory from './pages/Dashboard/FraudHistory';
// import SingleEntry from './pages/Predict/SingleEntry';
// import BulkUpload from './pages/Predict/BulkUpload';
// import About from './pages/Utilities/About';
// import FAQ from './pages/Utilities/FAQ';
// import Contact from './pages/Utilities/Contact';
// import Login from './pages/Auth/Login';








// const { Header, Sider, Content } = Layout;

// function App() {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider width={220} theme="dark">
//         <Sidebar />
//       </Sider>
//       <Layout style={{ flex: 1 }}>
//         <Header style={{ padding: 0, background: '#001529' }}>
//           <Navbar />
//         </Header>
//         <Content style={{
//           margin: '16px',
//           padding: '24px',
//           minHeight: 'calc(100vh - 112px)',
//           background: '#141414',
//           borderRadius: '12px',
//           color: 'white',
//           overflowX: 'auto',
//         }}>
//           <Routes>
//             <Route path="/" element={<Overview />} />

//             <Route path="/login" element={<Login />} />


//             <Route path="/dashboard/overview" element={<Overview />} />
//             <Route path="/dashboard/trends" element={<FraudTrends />} />
//             <Route path="/dashboard/history" element={<FraudHistory />} />

//             <Route path="/predict/single" element={<SingleEntry />} />
//             <Route path="/predict/bulk" element={<BulkUpload />} />

//             <Route path="/utilities/about" element={<About />} />
//             <Route path="/utilities/faq" element={<FAQ />} />

//             <Route path="/utilities/contact" element={<Contact />} />


//           </Routes>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default App;

