// import { Card, Typography } from 'antd';

// const { Title, Paragraph, Text } = Typography;

// const About = () => {
//   return (
//     <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
//       <Card
//         style={{
//           background: '#1f1f1f',
//           color: 'white',
//           borderRadius: 12,
//           boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
//         }}
//       >
//         <Title level={2} style={{ color: 'white' }}>
//           About Our Insurance Fraud Detection System
//         </Title>

//         <Paragraph style={{ color: '#ccc', fontSize: '16px' }}>
//           Our platform leverages advanced <Text strong>Machine Learning models</Text> to detect potentially fraudulent health insurance claims.
//           It provides both <Text strong>single entry prediction</Text> and <Text strong>bulk prediction</Text> for uploaded data.
//         </Paragraph>

//         <Paragraph style={{ color: '#ccc', fontSize: '16px' }}>
//           The system is trained on real-world claim patterns and includes various parameters such as patient details, diagnosis codes, provider location,
//           and submission methods. The model is regularly updated and tuned for optimal performance.
//         </Paragraph>

//         <Paragraph style={{ color: '#ccc', fontSize: '16px' }}>
//           With user-friendly dashboards and visualizations, organizations can quickly identify suspicious claims and reduce losses due to fraud.
//         </Paragraph>

//         <Title level={4} style={{ color: 'white', marginTop: '32px' }}>Features</Title>
//         <ul style={{ color: '#aaa', fontSize: '15px', paddingLeft: '1.5em' }}>
//           <li>🔍 Real-time single-entry fraud prediction</li>
//           <li>📁 CSV-based bulk upload prediction</li>
//           <li>📊 Fraud trend analytics & dashboards</li>
//           <li>🔐 Secure and responsive interface</li>
//           <li>💡 SHAP-based explainability coming soon</li>
//         </ul>
//       </Card>
//     </div>
//   );
// };

// export default About;



import { Card, Typography, Divider, Row, Col } from 'antd';
import { SafetyCertificateOutlined, BarChartOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Card
        style={{
          background: '#1f1f1f',
          color: 'white',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <Title level={2} style={{ color: 'white' }}>About the Platform</Title>
        <Paragraph style={{ color: '#ccc', fontSize: '16px' }}>
          Our Health Insurance Fraud Detection system is an intelligent platform designed to detect potentially fraudulent claims in real-time using machine learning. It provides accurate predictions and helps insurance companies minimize losses and protect genuine customers.
        </Paragraph>

        <Divider style={{ borderColor: '#444' }} />

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{ background: '#141414', textAlign: 'center', borderRadius: 10 }}
            >
              <SafetyCertificateOutlined style={{ fontSize: '36px', color: '#73d13d' }} />
              <Title level={4} style={{ color: 'white', marginTop: 12 }}>Reliable Detection</Title>
              <Text style={{ color: '#ccc' }}>
                Leverages trained models to detect fraudulent claims with high accuracy.
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{ background: '#141414', textAlign: 'center', borderRadius: 10 }}
            >
              <BarChartOutlined style={{ fontSize: '36px', color: '#69c0ff' }} />
              <Title level={4} style={{ color: 'white', marginTop: 12 }}>Detailed Analytics</Title>
              <Text style={{ color: '#ccc' }}>
                Visualize fraud trends and explore analytics to take proactive decisions.
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{ background: '#141414', textAlign: 'center', borderRadius: 10 }}
            >
              <ThunderboltOutlined style={{ fontSize: '36px', color: '#ff7875' }} />
              <Title level={4} style={{ color: 'white', marginTop: 12 }}>Fast & Secure</Title>
              <Text style={{ color: '#ccc' }}>
                Built on secure APIs with fast performance for real-time predictions.
              </Text>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default About;
