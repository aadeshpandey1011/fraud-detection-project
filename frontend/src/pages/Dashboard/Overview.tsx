import { Card, Col, Row, Typography } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

const Overview = () => {
  const metricCards = [
    { title: 'Total Claims', value: 12345 },
    { title: 'Fraudulent Claims', value: 678 },
    { title: 'Legitimate Claims', value: 11667 },
    { title: 'Model Accuracy (%)', value: '96.4%' },
  ];

  const fraudTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fraudulent Claims',
        data: [50, 75, 60, 90, 80, 100],
        borderColor: '#ff4d4f',
        backgroundColor: 'rgba(255, 77, 79, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const locationData = {
    labels: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'],
    datasets: [
      {
        label: 'Fraud Count',
        data: [120, 90, 70, 50, 40],
        backgroundColor: '#1890ff',
      },
    ],
  };

  return (
    <div style={{ padding: 24 }}>
      <AntTitle level={3} style={{ color: 'white' }}>Dashboard Overview</AntTitle>

      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        {metricCards.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              title={item.title}
              bordered={false}
              style={{ background: '#1f1f1f', color: 'white' }}
              headStyle={{ color: 'white' }}
              bodyStyle={{ fontSize: 20, fontWeight: 'bold', color: '#1890ff' }}
            >
              {item.value}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        <Col xs={24} md={12}>
          <Card
            title="Fraud Trends Over Time"
            style={{ background: '#1f1f1f' }}
            headStyle={{ color: 'white' }}
            bodyStyle={{ height: 300 }}
          >
            <Line data={fraudTrendData} />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Fraud Cases by City"
            style={{ background: '#1f1f1f' }}
            headStyle={{ color: 'white' }}
            bodyStyle={{ height: 300 }}
          >
            <Bar data={locationData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
