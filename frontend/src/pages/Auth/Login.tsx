// // src/pages/Auth/Login.tsx
// import { Button, Form, Input, Typography, Card, message } from "antd";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { saveToken } from "../../utils/auth";

// const { Title } = Typography;

// const Login = () => {
//   const navigate = useNavigate();

//   const onFinish = async (values: { username: string; password: string }) => {
//   try {
//     const formData = new URLSearchParams();
//     formData.append("username", values.username);
//     formData.append("password", values.password);

//     const response = await axios.post("http://127.0.0.1:8000/auth/login", formData, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });

//     const { access_token } = response.data;
//     saveToken(access_token);
//     message.success("Login successful!");
//     navigate("/dashboard/overview");
//   } catch (error) {
//     message.error("Login failed. Check credentials.");
//   }
// };


//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
//       <Card
//         style={{
//           width: "100%",
//           maxWidth: 400,
//           background: "#1f1f1f",
//           borderRadius: 12,
//         }}
//         title={<Title level={3} style={{ color: "white" }}>Login</Title>}
//       >
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             name="username"
//             label={<span style={{ color: "white" }}>Username</span>}
//             rules={[{ required: true, message: "Please input your username!" }]}
//           >
//             <Input placeholder="Enter username" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label={<span style={{ color: "white" }}>Password</span>}
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Log In
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Login;
















// src/pages/Auth/Login.tsx
// import { Typography } from "antd";

// const { Title } = Typography;

// const Login = () => {
//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <Title style={{ color: 'white' }}>🔐 Login Page</Title>
//     </div>
//   );
// };

// export default Login;























// // src/pages/Auth/Login.tsx

// import { Button, Form, Input, Typography, Card, message } from "antd";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { saveToken } from "../../utils/auth";
// import { useEffect } from "react";


// useEffect(() => {
//   message.success("🎉 Toast Test");
// }, []);


// const { Title, Text } = Typography;

// const Login = () => {
//   const navigate = useNavigate();

//   // const onFinish = async (values: { username: string; password: string }) => {
//   //   try {
//   //     const formData = new URLSearchParams();
//   //     formData.append("username", values.username);
//   //     formData.append("password", values.password);

//   //     const response = await axios.post("http://127.0.0.1:8000/auth/login", formData, {
//   //       headers: {
//   //         "Content-Type": "application/x-www-form-urlencoded",
//   //       },
//   //     });

//   //     const { access_token } = response.data;
//   //     saveToken(access_token);
//   //     message.success({
//   //       content: "Login successful!",
//   //       duration: 2,
//   //       style: { marginTop: '8vh' },  // ensures visibility in center screen
//   //     });
//   //     navigate("/dashboard/overview");

//   //   } catch (error) {
//   //     message.error({
//   //       content: "Login failed. Check credentials.",
//   //       duration: 2,
//   //       style: { marginTop: '8vh' },
//   //     });

//   //   }
//   // };


//   const onFinish = async (values: { username: string; password: string }) => {
//   try {
//     const formData = new URLSearchParams();
//     formData.append("username", values.username);
//     formData.append("password", values.password);

//     const response = await axios.post("http://127.0.0.1:8000/auth/login", formData, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });

//     const { access_token } = response.data;
//     saveToken(access_token);

//     message.success({
//       content: "Login successful!",
//       duration: 2,
//       style: { marginTop: '8vh' },
//     });

//     navigate("/dashboard/overview");
//   } catch (error) {
//     message.error({
//       content: "Login failed. Check credentials.",
//       duration: 2,
//       style: { marginTop: '8vh' },
//     });
//   }
// };


//   return (
//     <div style={{ display: "flex", justifyContent: "center", paddingTop: "8vh" }}>
//       <Card
//         style={{
//           width: "100%",
//           maxWidth: 420,
//           padding: "2rem",
//           background: "#1f1f1f",
//           borderRadius: 12,
//           boxShadow: "0 4px 18px rgba(0, 0, 0, 0.5)",
//         }}
//         title={
//           <Title level={3} style={{ color: "white", textAlign: "center", margin: 0 }}>
//             Log In
//           </Title>
//         }
//       >
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             name="username"
//             label={<span style={{ color: "white" }}>Username</span>}
//             rules={[{ required: true, message: "Please input your username!" }]}
//           >
//             <Input placeholder="Enter username" />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label={<span style={{ color: "white" }}>Password</span>}
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Log In
//             </Button>
//           </Form.Item>
//         </Form>

//         <div style={{ textAlign: "center", marginTop: 24 }}>
//           <Text style={{ color: "white" }}>
//             Don't have an account?
//           </Text>
//           <br />
//           <Button
//             type="link"
//             style={{
//               color: "#40a9ff",
//               fontWeight: 500,
//               padding: 0,
//               marginTop: 4,
//             }}
//             onClick={() => navigate("/register")}
//           >
//             Register here
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;














import { Button, Form, Input, Typography, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveToken } from "../../utils/auth";
import { useEffect } from "react";

import.meta.env.VITE_API_BASE_URL


const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    message.success("🎉 Toast Test");
  }, []);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;
      saveToken(access_token);

      message.success({
        content: "Login successful!",
        duration: 2,
        style: { marginTop: '8vh' },
      });

      navigate("/dashboard/overview");
    } catch (error) {
      message.error({
        content: "Login failed. Check credentials.",
        duration: 2,
        style: { marginTop: '8vh' },
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "8vh" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "2rem",
          background: "#1f1f1f",
          borderRadius: 12,
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.5)",
        }}
        title={
          <Title level={3} style={{ color: "white", textAlign: "center", margin: 0 }}>
            Log In
          </Title>
        }
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label={<span style={{ color: "white" }}>Username</span>}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: "white" }}>Password</span>}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Text style={{ color: "white" }}>Don't have an account?</Text>
          <br />
          <Button
            type="link"
            style={{ color: "#40a9ff", fontWeight: 500, padding: 0, marginTop: 4 }}
            onClick={() => navigate("/register")}
          >
            Register here
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;

