// import { Typography, Card, Row, Col } from 'antd';
// import { Line, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   ArcElement,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Tooltip,
//   Legend
// );

// const { Title: AntTitle } = Typography;

// const FraudTrends = () => {
//   const fraudTypeDistribution = {
//     labels: ['Billing Fraud', 'Duplicate Claims', 'Staged Accidents', 'False Info'],
//     datasets: [
//       {
//         label: 'Distribution',
//         data: [40, 25, 20, 15],
//         backgroundColor: ['#1890ff', '#52c41a', '#faad14', '#eb2f96'],
//         hoverOffset: 6,
//       },
//     ],
//   };

//   const fraudByMonth = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Fraudulent Claims',
//         data: [30, 40, 50, 60, 70, 80],
//         borderColor: '#ff4d4f',
//         backgroundColor: 'rgba(255,77,79,0.2)',
//         tension: 0.4,
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <AntTitle level={3} style={{ color: 'white' }}>Fraud Trends</AntTitle>

//       <Row gutter={[24, 24]}>
//         <Col xs={24} md={14}>
//           <Card
//             title="Fraud Over Time"
//             style={{ background: '#1f1f1f' }}
//             headStyle={{ color: 'white' }}
//             bodyStyle={{ height: 300 }}
//           >
//             <Line data={fraudByMonth} />
//           </Card>
//         </Col>

//         <Col xs={24} md={10}>
//           <Card
//             title="Fraud Types"
//             style={{ background: '#1f1f1f' }}
//             headStyle={{ color: 'white' }}
//             bodyStyle={{ height: 300 }}
//           >
//             <Doughnut data={fraudTypeDistribution} />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default FraudTrends;






















// import { Typography } from 'antd';

// const { Title } = Typography;

// const FraudTrends = () => {
//   return (
//     <div style={{ padding: 24 }}>
//       <Title level={3} style={{ color: 'white' }}>
//         Minimal Fraud Trends Page
//       </Title>
//       <p style={{ color: 'white' }}>This is a test version with no charts.</p>
//     </div>
//   );
// };

// export default FraudTrends;















import { Typography, Card, Row, Col, Select } from 'antd';
import { Line, Doughnut } from 'react-chartjs-2';
import { useState } from 'react';

import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

const FraudTrends = () => {
  console.log("✅ FraudTrends.tsx mounted");
  const [claimType, setClaimType] = useState('All');

  const fraudByMonth = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fraudulent Claims',
        data:
          claimType === 'Inpatient'
            ? [60, 50, 65, 80, 90, 100]
            : claimType === 'Outpatient'
            ? [30, 20, 35, 40, 45, 60]
            : [90, 70, 100, 120, 135, 160],
        fill: true,
        backgroundColor: 'rgba(255, 77, 79, 0.2)',
        borderColor: '#ff4d4f',
        tension: 0.4,
      },
    ],
  };

  const fraudTypeDistribution = {
    labels: ['Billing Fraud', 'Duplicate Claims', 'Staged Accidents', 'False Info'],
    datasets: [
      {
        label: 'Distribution',
        data: [40, 25, 20, 15],
        backgroundColor: ['#1890ff', '#52c41a', '#faad14', '#eb2f96'],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div style={{ padding: 24 }}>
      <AntTitle level={3} style={{ color: 'white' }}>Fraud Trends (With Filter)</AntTitle>

      {/* Dropdown Filter */}
      <div style={{ marginBottom: 16 }}>
        <Select
          value={claimType}
          onChange={setClaimType}
          options={[
            { label: 'All', value: 'All' },
            { label: 'Inpatient', value: 'Inpatient' },
            { label: 'Outpatient', value: 'Outpatient' },
          ]}
          style={{ width: 200 }}
        />
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Card
            title={`Fraudulent Claims (${claimType})`}
            style={{ background: '#1f1f1f' }}
            headStyle={{ color: 'white' }}
            bodyStyle={{ height: 300 }}
          >
            <Line data={fraudByMonth} />
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card
          title="Fraud Type Distribution"
          style={{ background: '#1f1f1f' }}
          headStyle={{ color: 'white' }}
          bodyStyle={{ height: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <Doughnut
              data={fraudTypeDistribution}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: 'white' }
                  }
                }
              }}
            />
          </div>
        </Card>

        </Col>
      </Row>
    </div>
  );
};

export default FraudTrends;


