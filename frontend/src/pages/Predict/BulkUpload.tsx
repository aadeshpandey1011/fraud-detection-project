// import { useState } from 'react';
// import {
//   Typography,
//   Upload,
//   message,
//   Table,
//   Card,
//   Button,
// } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import type { UploadFile } from 'antd/es/upload/interface';

// const { Title } = Typography;

// const BulkUpload = () => {
  
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const props = {
//     beforeUpload: (file: any) => {
//       const isCsv = file.type === 'text/csv';
//       if (!isCsv) {
//         message.error('Only CSV files are supported.');
//         return Upload.LIST_IGNORE;
//       }
//       setFileList([file]);
//       return false; // prevent auto upload
//     },
//     fileList,
//     onRemove: () => {
//       setFileList([]);
//       setData([]);
//     },
//   };

//   const handleUpload = async () => {
//     if (fileList.length === 0) return;

//     const formData = new FormData();
//     formData.append('file', fileList[0]);

//     try {
//       setLoading(true);
//       const response = await axios.post('http://127.0.0.1:8000/bulk-predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setData(response.data.predictions);
//     } catch (err) {
//       message.error('Bulk prediction failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       title: 'Claim ID',
//       dataIndex: 'claim_id',
//       key: 'claim_id',
//     },
//     {
//       title: 'Prediction',
//       dataIndex: 'prediction',
//       key: 'prediction',
//       render: (val: string) => (
//         <span style={{ color: val === 'Fraudulent' ? '#ff4d4f' : '#73d13d' }}>
//           {val}
//         </span>
//       ),
//     },
//     {
//       title: 'Probability',
//       dataIndex: 'probability',
//       key: 'probability',
//       render: (val: number) => `${(val * 100).toFixed(2)}%`,
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Title level={3} style={{ color: 'white' }}>Bulk Fraud Prediction</Title>

//       <Card
//         style={{ marginTop: 16, background: '#1f1f1f', borderRadius: 12 }}
//       >
//         <Upload {...props}>
//           <Button icon={<UploadOutlined />}>Select CSV File</Button>
//         </Upload>

//         <Button
//           type="primary"
//           onClick={handleUpload}
//           style={{ marginTop: 16 }}
//           disabled={fileList.length === 0}
//           loading={loading}
//         >
//           Upload & Predict
//         </Button>
//       </Card>

//       {data.length > 0 && (
//         <Card
//           style={{ marginTop: 24, background: '#141414', borderRadius: 12 }}
//         >
//           <Table
//             columns={columns}
//             dataSource={data}
//             rowKey="claim_id"
//             pagination={{ pageSize: 5 }}
//           />
//         </Card>
//       )}
//     </div>
//   );
// };

// export default BulkUpload;


















import { useState } from 'react';
import {
  Typography,
  Upload,
  message,
  Table,
  Card,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import type { UploadFile } from 'antd/es/upload/interface';



import { getToken } from '../../utils/auth';


const { Title } = Typography;

const BulkUpload = () => {
  
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const props = {
    beforeUpload: (file: any) => {
      const isCsv = file.type === 'text/csv';
      if (!isCsv) {
        message.error('Only CSV files are supported.');
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false; // prevent auto upload
    },
    fileList,
    onRemove: () => {
      setFileList([]);
      setData([]);
    },
  };

  const handleUpload = async () => {
    if (fileList.length === 0) return;

    const formData = new FormData();
    formData.append('file', fileList[0]);

    try {
      setLoading(true);
      const token = getToken();

      const response = await axios.post('http://127.0.0.1:8000/bulk-predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // ✅ Attach token
        },
      });
      setData(response.data.predictions);
    } catch (err) {
      message.error('Bulk prediction failed.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Claim ID',
      dataIndex: 'claim_id',
      key: 'claim_id',
    },
    {
      title: 'Prediction',
      dataIndex: 'prediction',
      key: 'prediction',
      render: (val: string) => (
        <span style={{ color: val === 'Fraudulent' ? '#ff4d4f' : '#73d13d' }}>
          {val}
        </span>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (val: number) => isNaN(val) ? '-' : `${(val * 100).toFixed(2)}%`,

    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ color: 'white' }}>Bulk Fraud Prediction</Title>

      <Card
          style={{ marginTop: 16, background:'#ADD8E6', borderRadius: 12, padding: 24 }}
        >

        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select CSV File</Button>
        </Upload>

        <Button
          type="primary"
          onClick={handleUpload}
          style={{ marginTop: 16 }}
          disabled={fileList.length === 0}
          loading={loading}
        >
          Upload & Predict
        </Button>
      </Card>

      {data.length > 0 && (
        <Card
          style={{ marginTop: 24, background: '#ADD8E6', borderRadius: 12 }}
        >
          <Table
            columns={columns}
            dataSource={data}
            rowKey="claim_id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      )}
    </div>
  );
};

export default BulkUpload;
