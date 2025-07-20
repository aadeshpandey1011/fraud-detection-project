// // src/layouts/ProtectedLayout.tsx
// import { Layout } from 'antd';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import { Outlet } from 'react-router-dom';

// const { Header, Sider, Content } = Layout;

// const ProtectedLayout = () => {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider width={220} theme="dark">
//         <Sidebar />
//       </Sider>
//       <Layout>
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
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default ProtectedLayout;























// src/layouts/ProtectedLayout.tsx
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const ProtectedLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} theme="dark">
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#001529" }}>
          <Navbar />
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            minHeight: "calc(100vh - 112px)",
            background: "#141414",
            borderRadius: "12px",
            color: "white",
            overflowX: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;
