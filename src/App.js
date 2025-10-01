// 필요한 라이브러리와 컴포넌트들을 가져옵니다
import React from 'react';                           // React 라이브러리 (웹사이트의 UI를 만드는 핵심 도구)
import './App.css';                                   // App 컴포넌트의 스타일 파일
import StateExample from './components/StateExample'; // useState 훅 예제 컴포넌트
import EffectExample from './components/EffectExample'; // useEffect 훅 예제 컴포넌트
import PropsExample from './components/PropsExample'; // Props 전달 예제 컴포넌트
import ConditionalRendering from './components/ConditionalRendering'; // 조건부 렌더링 예제 컴포넌트
import ListRendering from './components/ListRendering'; // 리스트 렌더링 예제 컴포넌트
import FormExample from './components/FormExample';   // 폼 처리 예제 컴포넌트
import ApiExample from './components/ApiExample';     // API 호출 예제 컴포넌트
import ComponentCommunication from './components/ComponentCommunication'; // 컴포넌트 간 통신 예제 컴포넌트
import CssStylingExample from './components/CssStylingExample'; // CSS 스타일링 예제 컴포넌트
import NodejsExample from './components/NodejsExample'; // Node.js 기본 개념 예제 컴포넌트
import RouterExample from './components/RouterExample'; // React Router 예제 컴포넌트
import CustomHooksExample from './components/CustomHooksExample'; // Custom Hooks 예제 컴포넌트
import ExpressServerExample from './components/ExpressServerExample'; // Express 서버 예제 컴포넌트
import DatabaseExample from './components/DatabaseExample'; // 데이터베이스 연동 예제 컴포넌트
import WebSocketExample from './components/WebSocketExample'; // 웹소켓 실시간 통신 예제 컴포넌트
import SpringBootExample from './components/SpringBootExample'; // Spring Boot 예제 컴포넌트

// App 컴포넌트 (우리 웹사이트의 메인 컴포넌트)
// 마치 책의 목차와 같아요 - 모든 학습 내용을 정리해서 보여줍니다
function App() {
  return (
    <div className="App">
      {/* 웹사이트의 헤더 부분 (제목과 설명) */}
      <header className="App-header">
        <h1>🚀 React 학습 프로젝트</h1>
        <p>React의 핵심 개념들을 학습해보세요!</p>
      </header>
      
      {/* 메인 내용을 담는 컨테이너 */}
      <div className="container">
        {/* 각각의 학습 예제 컴포넌트들을 순서대로 배치합니다 */}
        <StateExample />              {/* 1. useState 훅 학습 */}
        <EffectExample />             {/* 2. useEffect 훅 학습 */}
        <PropsExample />              {/* 3. Props 전달 학습 */}
        <ConditionalRendering />      {/* 4. 조건부 렌더링 학습 */}
        <ListRendering />             {/* 5. 리스트 렌더링 학습 */}
        <FormExample />               {/* 6. 폼 처리 학습 */}
        <ApiExample />                {/* 7. API 호출 학습 */}
        <ComponentCommunication />    {/* 8. 컴포넌트 간 통신 학습 */}
        <CssStylingExample />         {/* 9. CSS 스타일링 학습 */}
        <NodejsExample />             {/* 10. Node.js 기본 개념 학습 */}
        <RouterExample />             {/* 11. React Router 학습 */}
        <CustomHooksExample />        {/* 12. Custom Hooks 학습 */}
        <ExpressServerExample />      {/* 13. Express 서버 학습 */}
        <DatabaseExample />           {/* 14. 데이터베이스 연동 학습 */}
        <WebSocketExample />          {/* 15. 웹소켓 실시간 통신 학습 */}
        <SpringBootExample />         {/* 16. Spring Boot 학습 */}
      </div>
    </div>
  );
}

// App 컴포넌트를 다른 파일에서 사용할 수 있게 내보냅니다
// 마치 책을 도서관에 기증하는 것과 같아요
export default App;
