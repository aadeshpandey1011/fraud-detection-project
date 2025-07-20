// src/layouts/PublicLayout.tsx
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const PublicLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#141414' }}>
      <Content style={{ padding: 24 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PublicLayout;
