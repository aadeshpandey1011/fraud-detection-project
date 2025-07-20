import { Card, Collapse, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const FAQ = () => {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Card
        style={{
          background: '#1f1f1f',
          
          color: 'white',
          borderRadius: 12,
          boxShadow: '0 4px 20px white',
        }}
      >
        <Title level={2} style={{ color: 'white' }}>
          Frequently Asked Questions
        </Title>

        <Collapse accordion style={{ backgroundColor: '	#87cefa', marginTop: 16 }}>
          <Panel header="🔎 How does the fraud prediction work?" key="1">
            <Paragraph style={{ color: 'white' }}>
              The system uses a machine learning model trained on labeled insurance claim data. Based on patterns in the data you enter or upload,
              it predicts whether a claim is fraudulent or legitimate.
            </Paragraph>
          </Panel>
          <Panel header="📁 Can I upload multiple claims at once?" key="2">
            <Paragraph style={{ color: 'white' }}>
              Yes, use the <strong>Bulk Upload</strong> option in the Predict section to upload a CSV file with multiple claims.
              You'll get predictions for each entry.
            </Paragraph>
          </Panel>
          <Panel header="📉 What evaluation metrics are used?" key="3">
            <Paragraph style={{ color: 'white' }}>
              The model performance is evaluated using precision, recall, F1-score, and ROC-AUC. We ensure balanced detection using SMOTE for rare fraud cases.
            </Paragraph>
          </Panel>
          <Panel header="🛡️ How secure is my data?" key="4">
            <Paragraph style={{ color: 'white' }}>
              Data is only used locally in your browser for prediction. No sensitive data is stored or shared externally unless deployed in a secured backend.
            </Paragraph>
          </Panel>
          <Panel header="💬 How can I give feedback or report an issue?" key="5">
            <Paragraph style={{ color: 'white' }}>
              Visit the <strong>Contact</strong> page to submit your queries or feedback. We’ll respond as soon as possible.
            </Paragraph>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default FAQ;
