

import { useState } from 'react';

import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  message,
} from 'antd';
import axios from 'axios';
import { getToken } from '../../utils/auth';

import.meta.env.VITE_API_BASE_URL


const { Title, Text } = Typography;

const SingleEntry = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    prediction: string;
    probability: number;
  } | null>(null);

  const onFinish = async (values: any) => {
    console.log("📤 Sending values to backend:", values);
    try {
      setLoading(true);
      const token = getToken();

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/predict`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(response.data);
    } catch (error) {
      message.error('Prediction failed. Check backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <Card
        title={
          <Title level={3} style={{ margin: 0, color: 'white' }}>
            Predict Insurance Fraud
          </Title>
        }
        bordered={false}
        style={{
          width: '100%',
          maxWidth: 720,
          background: 'rgba(70, 70, 70, 1)',
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
        headStyle={{ background: 'rgba(255, 0, 0, 1)' }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="claimamount"
            label="Claim Amount"
            rules={[{ required: true, message: 'Please enter the claim amount' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Enter claim amount" />
          </Form.Item>

          <Form.Item
            name="diagnosiscode"
            label="Diagnosis Code"
            rules={[{ required: true, message: 'Please enter diagnosis code' }]}
          >
            <Input placeholder="e.g., RX341" />
          </Form.Item>

          <Form.Item
            name="procedurecode"
            label="Procedure Code"
            rules={[{ required: true, message: 'Please enter procedure code' }]}
          >
            <Input placeholder="e.g., PR001" />
          </Form.Item>

          <Form.Item
            name="patientage"
            label="Patient Age"
            rules={[{ required: true, message: 'Please enter patient age' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="e.g., 45" />
          </Form.Item>

          <Form.Item
            name="patientgender"
            label="Patient Gender"
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select
              placeholder="Select gender"
              options={[
                { value: 'Male' },
                { value: 'Female' },
                { value: 'Other' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="providerspecialty"
            label="Provider Specialty"
            rules={[{ required: true, message: 'Please select provider specialty' }]}
          >
            <Select
              placeholder="Select specialty"
              options={[
                { value: 'Cardiology' },
                { value: 'General Medicine' },
                { value: 'Radiology' },
                { value: 'Orthopedics' },
                { value: 'Neurology' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="claimstatus"
            label="Claim Status"
            rules={[{ required: true, message: 'Please select claim status' }]}
          >
            <Select
              placeholder="Select status"
              options={[
                { value: 'Approved' },
                { value: 'Rejected' },
                { value: 'Pending' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="patientincome"
            label="Patient Income"
            rules={[{ required: true, message: 'Please enter patient income' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Annual income (in ₹)" />
          </Form.Item>

          <Form.Item
            name="patientmaritalstatus"
            label="Marital Status"
            rules={[{ required: true, message: 'Please select marital status' }]}
          >
            <Select
              placeholder="Select status"
              options={[
                { value: 'Single' },
                { value: 'Married' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="patientemploymentstatus"
            label="Employment Status"
            rules={[{ required: true, message: 'Please select employment status' }]}
          >
            <Select
              placeholder="Select employment status"
              options={[
                { value: 'Employed' },
                { value: 'Unemployed' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="providerlocation"
            label="Provider Location"
            rules={[{ required: true, message: 'Please enter provider location' }]}
          >
            <Input placeholder="e.g., Delhi, Mumbai, Varanasi" />
          </Form.Item>

          <Form.Item
            name="claimtype"
            label="Claim Type"
            rules={[{ required: true, message: 'Please select claim type' }]}
          >
            <Select
              placeholder="Select claim type"
              options={[
                { value: 'Inpatient' },
                { value: 'Outpatient' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="claimsubmissionmethod"
            label="Submission Method"
            rules={[{ required: true, message: 'Please select submission method' }]}
          >
            <Select
              placeholder="Select submission method"
              options={[
                { value: 'Online' },
                { value: 'Phone' },
                { value: 'In-Person' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Predict
            </Button>
          </Form.Item>
        </Form>

        {result && (
          <div style={{ marginTop: 24, textAlign: 'center' }} aria-live="polite">
            <Title level={4} style={{ color: result.prediction === 'Fraudulent' ? '#ff4d4f' : '#73d13d' }}>
              {result.prediction.toUpperCase()}
            </Title>
            <Text style={{ fontSize: 16, color: 'white' }}>
              Probability: {(result.probability * 100).toFixed(2)}%
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SingleEntry;







// import { useState } from 'react';
// import {
//   Button,
//   Card,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Typography,
//   message,
// } from 'antd';
// import axios from 'axios';
// import { getToken } from '../../utils/auth';

// const { Title, Text } = Typography;

// const SingleEntry = () => {
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<{
//     prediction: string;
//     probability: number;
//   } | null>(null);

//   const onFinish = async (values: any) => {
//     try {
//       setLoading(true);
//       const token = getToken();

//       const response = await axios.post('http://127.0.0.1:8000/predict', values, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setResult(response.data);
//     } catch (error) {
//       message.error('Prediction failed. Check backend.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
//       <Card
//         title={
//           <Title level={3} style={{ margin: 0, color: 'white' }}>
//             Predict Insurance Fraud
//           </Title>
//         }
//         bordered={false}
//         style={{
//           width: '100%',
//           maxWidth: 720,
//           background: 'rgba(70, 70, 70, 1)',
//           borderRadius: 12,
//           boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
//         }}
//         headStyle={{ background: 'rgba(255, 0, 0, 1)' }}
//       >
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             name="ClaimAmount"
//             label="Claim Amount"
//             rules={[{ required: true, message: 'Please enter the claim amount' }]}
//           >
//             <InputNumber style={{ width: '100%' }} placeholder="Enter claim amount" />
//           </Form.Item>

//           <Form.Item
//             name="DiagnosisCode"
//             label="Diagnosis Code"
//             rules={[{ required: true, message: 'Please enter diagnosis code' }]}
//           >
//             <Input placeholder="e.g., RX341" />
//           </Form.Item>

//           <Form.Item
//             name="ProcedureCode"
//             label="Procedure Code"
//             rules={[{ required: true, message: 'Please enter procedure code' }]}
//           >
//             <Input placeholder="e.g., PR001" />
//           </Form.Item>

//           <Form.Item
//             name="PatientAge"
//             label="Patient Age"
//             rules={[{ required: true, message: 'Please enter patient age' }]}
//           >
//             <InputNumber style={{ width: '100%' }} placeholder="e.g., 45" />
//           </Form.Item>

//           <Form.Item
//             name="PatientGender"
//             label="Patient Gender"
//             rules={[{ required: true, message: 'Please select gender' }]}
//           >
//             <Select
//               placeholder="Select gender"
//               options={[
//                 { value: 'Male' },
//                 { value: 'Female' },
//                 { value: 'Other' },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="ProviderSpecialty"
//             label="Provider Specialty"
//             rules={[{ required: true, message: 'Please select provider specialty' }]}
//           >
//             <Select
//               placeholder="Select specialty"
//               options={[
//                 { value: 'Cardiology' },
//                 { value: 'General Medicine' },
//                 { value: 'Radiology' },
//                 { value: 'Orthopedics' },
//                 { value: 'Neurology' },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="ClaimStatus"
//             label="Claim Status"
//             rules={[{ required: true, message: 'Please select claim status' }]}
//           >
//             <Select
//               placeholder="Select status"
//               options={[
//                 { value: 'Approved' },
//                 { value: 'Rejected' },
//                 { value: 'Pending' },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="PatientIncome"
//             label="Patient Income"
//             rules={[{ required: true, message: 'Please enter patient income' }]}
//           >
//             <InputNumber style={{ width: '100%' }} placeholder="Annual income (in ₹)" />
//           </Form.Item>

//           <Form.Item
//             name="PatientMaritalStatus"
//             label="Marital Status"
//             rules={[{ required: true, message: 'Please select marital status' }]}
//           >
//             <Select
//               placeholder="Select status"
//               options={[
//                 { value: 'Single' },
//                 { value: 'Married' },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="PatientEmploymentStatus"
//             label="Employment Status"
//             rules={[{ required: true, message: 'Please select employment status' }]}
//           >
//             <Select
//               placeholder="Select employment status"
//               options={[
//                 { value: 'Employed' },
//                 { value: 'Unemployed' },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="ProviderLocation"
//             label="Provider Location"
//             rules={[{ required: true, message: 'Please enter provider location' }]}
//           >
//             <Input placeholder="e.g., Delhi, Mumbai, Varanasi" />
//           </Form.Item>

//           <Form.Item
//             name="ClaimType"
//             label="Claim Type"
//             rules={[{ required: true, message: 'Please select claim type' }]}
//           >
//             <Select
//               placeholder="Select claim type"
//               options={[
//                 { value: 'Inpatient' },
//                 { value: 'Outpatient' },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="ClaimSubmissionMethod"
//             label="Submission Method"
//             rules={[{ required: true, message: 'Please select submission method' }]}
//           >
//             <Select
//               placeholder="Select submission method"
//               options={[
//                 { value: 'Online' },
//                 { value: 'Phone' },
//                 { value: 'In-Person' },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} block>
//               Predict
//             </Button>
//           </Form.Item>
//         </Form>

//         {result && (
//           <div style={{ marginTop: 24, textAlign: 'center' }} aria-live="polite">
//             <Title level={4} style={{ color: result.prediction === 'Fraudulent' ? '#ff4d4f' : '#73d13d' }}>
//               {result.prediction.toUpperCase()}
//             </Title>
//             <Text style={{ fontSize: 16, color: 'white' }}>
//               Probability: {(result.probability * 100).toFixed(2)}%
//             </Text>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default SingleEntry;
