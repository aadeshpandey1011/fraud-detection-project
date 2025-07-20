// import { Table, Tag, Typography, Card } from 'antd';

// const { Title } = Typography;

// const data = [
//   {
//     key: '1',
//     claimId: 'CLM-1001',
//     patient: 'John Doe',
//     amount: 45000,
//     status: 'Fraudulent',
//     claimType: 'Inpatient',
//   },
//   {
//     key: '2',
//     claimId: 'CLM-1002',
//     patient: 'Jane Smith',
//     amount: 18000,
//     status: 'Legit',
//     claimType: 'Outpatient',
//   },
//   {
//     key: '3',
//     claimId: 'CLM-1003',
//     patient: 'Ravi Kumar',
//     amount: 32000,
//     status: 'Fraudulent',
//     claimType: 'Outpatient',
//   },
//   {
//     key: '4',
//     claimId: 'CLM-1004',
//     patient: 'Aarav Mehta',
//     amount: 21000,
//     status: 'Legit',
//     claimType: 'Inpatient',
//   },
// ];

// const columns = [
//   {
//     title: 'Claim ID',
//     dataIndex: 'claimId',
//     key: 'claimId',
//   },
//   {
//     title: 'Patient',
//     dataIndex: 'patient',
//     key: 'patient',
//   },
//   {
//     title: 'Amount',
//     dataIndex: 'amount',
//     key: 'amount',
//     render: (value: number) => `₹${value.toLocaleString()}`,
//   },
//   {
//     title: 'Claim Type',
//     dataIndex: 'claimType',
//     key: 'claimType',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//     render: (status: string) => (
//       <Tag color={status === 'Fraudulent' ? 'red' : 'green'}>
//         {status.toUpperCase()}
//       </Tag>
//     ),
//   },
// ];

// const FraudHistory = () => {
//   return (
//     <div style={{ padding: 24 }}>
//       <Title level={3} style={{ color: 'white' }}>Fraud Prediction History</Title>

//       <Card
//         style={{ background: '#1f1f1f', marginTop: 16 }}
//         bodyStyle={{ padding: 0 }}
//       >
//         <Table
//           columns={columns}
//           dataSource={data}
//           pagination={{ pageSize: 5 }}
//           style={{ color: 'white' }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default FraudHistory;













// src/pages/Dashboard/FraudHistory.tsx

import { Card, Table, Typography, Tag, Input } from 'antd';
import { useState } from 'react';

const { Title } = Typography;
const { Search } = Input;

const FraudHistory = () => {
  const [searchText, setSearchText] = useState('');

  const rawData = [
    {
      key: '1',
      claim_id: 'CLM001',
      patient_id: 'PAT001',
      date: '2024-10-10',
      amount: 12000,
      prediction: 'Fraudulent',
      probability: 0.92,
    },
    {
      key: '2',
      claim_id: 'CLM002',
      patient_id: 'PAT002',
      date: '2024-11-12',
      amount: 8000,
      prediction: 'Legitimate',
      probability: 0.15,
    },
    {
      key: '3',
      claim_id: 'CLM003',
      patient_id: 'PAT003',
      date: '2024-09-05',
      amount: 5000,
      prediction: 'Fraudulent',
      probability: 0.81,
    },
    // Add more if needed
  ];

  const filteredData = rawData.filter((item) =>
    item.claim_id.toLowerCase().includes(searchText.toLowerCase()) ||
    item.patient_id.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Claim ID',
      dataIndex: 'claim_id',
      key: 'claim_id',
    },
    {
      title: 'Patient ID',
      dataIndex: 'patient_id',
      key: 'patient_id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amt: number) => `₹${amt.toLocaleString()}`,
    },
    {
      title: 'Prediction',
      dataIndex: 'prediction',
      key: 'prediction',
      render: (val: string) => (
        <Tag color={val === 'Fraudulent' ? 'red' : 'green'}>{val}</Tag>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (val: number) => `${(val * 100).toFixed(2)}%`,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: 'white' }}>Fraud History</Title>

      <Search
        placeholder="Search by Claim ID or Patient ID"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />

      <Card style={{ background: '#1f1f1f', borderRadius: 12 }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          style={{ background: '#141414' }}
        />
      </Card>
    </div>
  );
};

export default FraudHistory;
