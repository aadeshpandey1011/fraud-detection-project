// src/pages/Auth/Register.tsx

// import { useState } from 'react';
// import {
//   Form,
//   Input,
//   Button,
//   Typography,
//   Card,
//   message,
// } from 'antd';
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography;

// const Register = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       // Placeholder: Replace this with actual backend call
//       console.log('Register values:', values);
//       message.success('Registration successful!');
//       navigate('/login');
//     } catch (error) {
//       message.error('Registration failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5vh' }}>
//       <Card
//         style={{
//           maxWidth: 400,
//           width: '100%',
//           padding: 24,
//           borderRadius: 12,
//           background: '#001529',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
//         }}
//       >
//         <Title level={3} style={{ textAlign: 'center', color: 'white' }}>
//           Register
//         </Title>

//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[{ required: true, message: 'Please enter your username' }]}
//           >
//             <Input placeholder="Enter username" />
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: 'Please enter your email' },
//               { type: 'email', message: 'Enter a valid email' },
//             ]}
//           >
//             <Input placeholder="Enter email" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please enter your password' }]}
//           >
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block loading={loading}>
//               Register
//             </Button>
//           </Form.Item>

//           <Form.Item>
//             <Button block onClick={() => navigate('/login')}>
//               Go to Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Register;





import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register', values);

      if (response.status === 200) {
        message.success('Registration successful! Please log in.');
        navigate('/login');
      } else {
        message.error('Registration failed.');
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        message.error(error.response.data.detail || 'User already exists.');
      } else {
        message.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5vh' }}>
      <Card
        style={{
          maxWidth: 400,
          width: '100%',
          padding: 24,
          borderRadius: 12,
          background: '#001529',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Title level={3} style={{ textAlign: 'center', color: 'white' }}>
          Register
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span style={{ color: 'white' }}>Username</span>}
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: 'white' }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: 'white' }}>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <Button block onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
