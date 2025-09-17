import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css'; // for 부트 스트랩

// App.js 파일 내의 모든 라우터 정보를 감싸는 역할
import { BrowserRouter } from 'react-router-dom'; // 신규 생성

const root = ReactDOM.createRoot(document.getElementById('root'));

// StrictMode: 개발 도중 발생하는 문제를 추가적으로 감지하기 위해 rendering를 2번 수행
// StrictMode 코드 삭제 , BrowserRouter 생성
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
