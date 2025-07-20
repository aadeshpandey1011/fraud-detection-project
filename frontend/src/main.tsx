// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import './index.css'; // ✅ keep your global styles
import 'antd/dist/reset.css'; // ✅ Ant Design v5 styling reset

import { ConfigProvider, theme } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);








// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { ConfigProvider, theme } from 'antd';
// import './index.css';
// import './App.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
//         <App />
//       </ConfigProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


