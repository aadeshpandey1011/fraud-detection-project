// import { Typography } from 'antd';

// const Navbar = () => {
//   return (
//     <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', height: '100%' }}>
//       <Typography.Title level={4} style={{ color: 'white', margin: 0 }}>
//         Health Insurance Fraud Detection
//       </Typography.Title>
//     </div>
//   );
// };

// export default Navbar;






// import { Button, Typography } from 'antd';
// import { isAuthenticated, removeToken } from '../utils/auth';
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography;

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     removeToken();
//     navigate("/login");
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '0 24px',
//       height: '64px',
//     }}>
//       <Title level={3} style={{ color: 'white', margin: 0 }}>Health Insurance Fraud Detection</Title>
//       {isAuthenticated() && (
//         <Button type="primary" danger onClick={handleLogout}>
//           Logout
//         </Button>
//       )}
//     </div>
//   );
// };

// export default Navbar;








import { Button, Typography } from 'antd';
import { isAuthenticated, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
   <div
  style={{
    position: 'fixed',              // ✅ Keep navbar always on top
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    zIndex: 100,
    background: '#001529',         // ✅ Ensure background matches
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
  }}
>
      <Title level={3} style={{ color: 'white', margin: 0 }}>Health Insurance Fraud Detection</Title>
      {isAuthenticated() && (
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Navbar;