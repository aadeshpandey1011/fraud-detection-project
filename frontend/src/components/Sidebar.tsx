// src/components/Sidebar.tsx

import { Menu } from 'antd';
import {
  UploadOutlined,
  BarChartOutlined,
  FileAddOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract selected key from path
  const [selectedKey, setSelectedKey] = useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname;
    const parts = path.split('/');
    if (parts.length >= 3) {
      setSelectedKey([parts[2]]);
    } else {
      setSelectedKey(['overview']);
    }
  }, [location]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '64px', // 🔽 Pushes sidebar below navbar
        left: 0,
        bottom: 0,
        width: '220px',
        background: '#001529',
        overflowY: 'auto',
      }}
    >
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKey}
      defaultOpenKeys={['dashboard', 'predict', 'utilities']}
      style={{ fontWeight: 500 }}
    >
      <Menu.SubMenu
        key="dashboard"
        icon={<BarChartOutlined />}
        title={<span style={{ fontWeight: 'bold' }}>Dashboard</span>}
      >
        <Menu.Item key="overview" onClick={() => navigate('/dashboard/overview')}>
          Overview
        </Menu.Item>
        <Menu.Item key="trends" onClick={() => navigate('/dashboard/trends')}>
          Fraud Trends
        </Menu.Item>
        <Menu.Item key="history" onClick={() => navigate('/dashboard/history')}>
          Fraud History
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="predict"
        icon={<UploadOutlined />}
        title={<span style={{ fontWeight: 'bold' }}>Predict</span>}
      >
        <Menu.Item key="single" onClick={() => navigate('/predict/single')}>
          Single Entry
        </Menu.Item>
        <Menu.Item key="bulk" onClick={() => navigate('/predict/bulk')}>
          Bulk Upload
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="utilities"
        icon={<FileAddOutlined />}
        title={<span style={{ fontWeight: 'bold' }}>Utilities</span>}
      >
        <Menu.Item key="about" icon={<InfoCircleOutlined />} onClick={() => navigate('/utilities/about')}>
          About
        </Menu.Item>
        <Menu.Item key="faq" icon={<QuestionCircleOutlined />} onClick={() => navigate('/utilities/faq')}>
          FAQ
        </Menu.Item>
        <Menu.Item key="contact" icon={<PhoneOutlined />} onClick={() => navigate('/utilities/contact')}>
          Contact
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
    </div>
  );
};

export default Sidebar;















// import { Menu } from 'antd';
// import {
//   PieChartOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   HistoryOutlined,
//   FileAddOutlined,
//   FolderOpenOutlined,
//   InfoCircleOutlined,
//   QuestionCircleOutlined,
//   PhoneOutlined,
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();

//   return (
//     <Menu theme="dark" mode="inline" style={{ fontWeight: 500 }}>
//       <Menu.SubMenu
//         key="dashboard"
//         icon={<BarChartOutlined />}
//         title={<span style={{ fontWeight: 'bold' }}>Dashboard</span>}
//       >
//         <Menu.Item key="overview" onClick={() => navigate('/dashboard/overview')}>
//           Overview
//         </Menu.Item>
//         <Menu.Item key="trends" onClick={() => navigate('/dashboard/trends')}>
//           Fraud Trends
//         </Menu.Item>
//         <Menu.Item key="history" onClick={() => navigate('/dashboard/history')}>
//           Fraud History
//         </Menu.Item>
//       </Menu.SubMenu>

//       <Menu.SubMenu
//         key="predict"
//         icon={<UploadOutlined />}
//         title={<span style={{ fontWeight: 'bold' }}>Predict</span>}
//       >
//         <Menu.Item key="single" onClick={() => navigate('/predict/single')}>
//           Single Entry
//         </Menu.Item>
//         <Menu.Item key="bulk" onClick={() => navigate('/predict/bulk')}>
//           Bulk Upload
//         </Menu.Item>
//       </Menu.SubMenu>

//       <Menu.SubMenu
//         key="utilities"
//         icon={<FileAddOutlined />}
//         title={<span style={{ fontWeight: 'bold' }}>Utilities</span>}
//       >
//         <Menu.Item key="about" icon={<InfoCircleOutlined />} onClick={() => navigate('/utilities/about')}>
//           About
//         </Menu.Item>
//         <Menu.Item key="faq" icon={<QuestionCircleOutlined />} onClick={() => navigate('/utilities/faq')}>
//           FAQ
//         </Menu.Item>
//         <Menu.Item key="contact" icon={<PhoneOutlined />} onClick={() => navigate('/utilities/contact')}>
//           Contact
//         </Menu.Item>
//       </Menu.SubMenu>
//     </Menu>
//   );
// };

// export default Sidebar;


