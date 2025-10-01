// 필요한 라이브러리들을 가져옵니다
import React from 'react';                    // React 라이브러리 (웹사이트의 UI를 만드는 핵심 도구)
import ReactDOM from 'react-dom/client';      // React DOM (React를 브라우저에 실제로 보여주는 도구)
import './index.css';                          // CSS 스타일 파일 (웹사이트의 디자인)
import App from './App';                       // 메인 App 컴포넌트 (우리 웹사이트의 시작점)

// React 앱을 브라우저에 연결하는 과정
// 1단계: HTML에서 'root'라는 ID를 가진 요소를 찾습니다
// 마치 집의 현관문을 찾는 것과 같아요
const root = ReactDOM.createRoot(document.getElementById('root'));

// 2단계: React 앱을 실제로 브라우저에 그려줍니다
// 마치 그림을 캔버스에 그리는 것과 같아요
root.render(
  // React.StrictMode는 개발할 때 도움을 주는 도구입니다
  // 마치 선생님이 숙제를 체크해주는 것과 같아요
  <React.StrictMode>
    {/* App 컴포넌트를 렌더링합니다 (우리 웹사이트의 메인 내용) */}
    <App />
  </React.StrictMode>
);
