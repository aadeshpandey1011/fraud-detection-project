// import { useState } from 'react';
// import { Card, Form, Input, Button, Typography, message } from 'antd';

// const { Title, Paragraph } = Typography;
// const { TextArea } = Input;

// const Contact = () => {
//   const [submitting, setSubmitting] = useState(false);

//   const onFinish = (values: any) => {
//     setSubmitting(true);
//     setTimeout(() => {
//       setSubmitting(false);
//       message.success('Your message has been sent!');
//     }, 1000);
//   };

//   return (
//     <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
//       <Card
//         style={{
//           background: '#1f1f1f',
//           color: 'white',
//           borderRadius: 12,
//           boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
//         }}
//       >
//         <Title level={2} style={{ color: 'white' }}>Contact Us</Title>
//         <Paragraph style={{ color: '#ccc', marginBottom: 24 }}>
//           Have questions, feedback, or need support? Fill out the form below and we’ll get back to you soon.
//         </Paragraph>

//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item name="name" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
//             <Input placeholder="John Doe" />
//           </Form.Item>

//           <Form.Item name="email" label="Email Address" rules={[
//             { required: true, message: 'Please enter your email' },
//             { type: 'email', message: 'Enter a valid email' }
//           ]}>
//             <Input placeholder="you@example.com" />
//           </Form.Item>

//           <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter your message' }]}>
//             <TextArea rows={4} placeholder="Type your message here..." />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={submitting} block>
//               Send Message
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Contact;















// src/pages/Utilities/Contact.tsx

import { Card, Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Contact Form Submitted:', values);
    message.success('Your message has been submitted!');
    form.resetFields();
  };

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <Card
        style={{
          background: '#1f1f1f',
          color: 'white',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <Title level={2} style={{ color: 'white' }}>Contact Us</Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Your Message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea rows={4} placeholder="Type your message..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact;

