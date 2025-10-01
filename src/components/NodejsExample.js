// 필요한 라이브러리를 가져옵니다
import React, { useState, useEffect } from 'react';  // React와 훅들을 가져옵니다

// NodejsExample 컴포넌트 (Node.js 기본 개념을 학습하는 컴포넌트)
// Node.js는 JavaScript를 서버에서 실행할 수 있게 해주는 런타임 환경입니다
// 마치 JavaScript를 브라우저 밖에서도 사용할 수 있게 해주는 도구와 같아요
const NodejsExample = () => {
  // 여러 가지 state들을 선언합니다
  const [serverStatus, setServerStatus] = useState('offline');  // 서버 상태
  const [serverLogs, setServerLogs] = useState([]);            // 서버 로그
  const [apiData, setApiData] = useState(null);                // API 데이터
  const [fileContent, setFileContent] = useState('');          // 파일 내용
  const [isLoading, setIsLoading] = useState(false);           // 로딩 상태

  // 1. Node.js 기본 개념 설명
  const nodejsConcepts = [
    {
      title: "Node.js란?",
      description: "JavaScript를 서버에서 실행할 수 있게 해주는 런타임 환경입니다.",
      example: "브라우저 없이도 JavaScript로 웹서버를 만들 수 있어요!",
      code: `// 간단한 Node.js 서버 예제
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello Node.js!</h1>');
});

server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다!');
});`
    },
    {
      title: "NPM (Node Package Manager)",
      description: "Node.js 패키지들을 관리하는 도구입니다.",
      example: "다른 사람이 만든 코드를 쉽게 설치하고 사용할 수 있어요!",
      code: `# 패키지 설치
npm install express

# 패키지 제거
npm uninstall express

# package.json 파일 생성
npm init`
    },
    {
      title: "모듈 시스템",
      description: "코드를 여러 파일로 나누어 관리하는 방법입니다.",
      example: "큰 프로젝트를 작은 단위로 나누어 관리할 수 있어요!",
      code: `// math.js (모듈 내보내기)
function add(a, b) {
  return a + b;
}

module.exports = { add };

// main.js (모듈 가져오기)
const { add } = require('./math.js');
console.log(add(2, 3)); // 5`
    },
    {
      title: "비동기 프로그래밍",
      description: "여러 작업을 동시에 처리하는 방법입니다.",
      example: "파일을 읽는 동안 다른 작업도 계속할 수 있어요!",
      code: `// 파일 읽기 (비동기)
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('파일 읽기 실패:', err);
  } else {
    console.log('파일 내용:', data);
  }
});

console.log('이 코드는 파일 읽기가 끝나기 전에 실행됩니다!');`
    }
  ];

  // 2. 서버 상태 시뮬레이션
  const startServer = () => {
    setServerStatus('starting');
    setServerLogs(prev => [...prev, '서버 시작 중...']);
    
    setTimeout(() => {
      setServerStatus('online');
      setServerLogs(prev => [...prev, '서버가 성공적으로 시작되었습니다!']);
      setServerLogs(prev => [...prev, '포트 3000에서 대기 중...']);
    }, 2000);
  };

  const stopServer = () => {
    setServerStatus('stopping');
    setServerLogs(prev => [...prev, '서버 종료 중...']);
    
    setTimeout(() => {
      setServerStatus('offline');
      setServerLogs(prev => [...prev, '서버가 종료되었습니다.']);
    }, 1000);
  };

  // 3. API 호출 시뮬레이션
  const callApi = async () => {
    setIsLoading(true);
    setServerLogs(prev => [...prev, 'API 요청 시작...']);
    
    try {
      // 실제 API 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = {
        message: 'Node.js 서버에서 온 응답입니다!',
        timestamp: new Date().toLocaleString(),
        data: {
          users: 150,
          posts: 1200,
          comments: 5600
        }
      };
      
      setApiData(mockData);
      setServerLogs(prev => [...prev, 'API 응답 수신 완료']);
    } catch (error) {
      setServerLogs(prev => [...prev, 'API 요청 실패: ' + error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. 파일 시스템 시뮬레이션
  const readFile = () => {
    setServerLogs(prev => [...prev, '파일 읽기 시작...']);
    
    const mockFileContent = `// package.json 예제
{
  "name": "my-nodejs-app",
  "version": "1.0.0",
  "description": "Node.js 학습용 애플리케이션",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  }
}`;
    
    setTimeout(() => {
      setFileContent(mockFileContent);
      setServerLogs(prev => [...prev, '파일 읽기 완료']);
    }, 1000);
  };

  // 5. 로그 정리
  const clearLogs = () => {
    setServerLogs([]);
  };

  return (
    <div className="section">
      <h2>🟢 Node.js 기본 개념 예제</h2>
      
      {/* Node.js 기본 개념 설명 */}
      <div className="card">
        <h3>1. Node.js 기본 개념</h3>
        <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
          {nodejsConcepts.map((concept, index) => (
            <div key={index} style={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                {concept.title}
              </h4>
              <p style={{ marginBottom: '10px', lineHeight: '1.6' }}>
                {concept.description}
              </p>
              <p style={{ 
                fontStyle: 'italic', 
                color: '#7f8c8d', 
                marginBottom: '15px',
                padding: '10px',
                backgroundColor: '#ecf0f1',
                borderRadius: '4px'
              }}>
                💡 {concept.example}
              </p>
              <pre style={{ 
                backgroundColor: '#2c3e50', 
                color: '#ecf0f1', 
                padding: '15px', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
                lineHeight: '1.4'
              }}>
                {concept.code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* 서버 시뮬레이션 */}
      <div className="card">
        <h3>2. Node.js 서버 시뮬레이션</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={startServer} 
            disabled={serverStatus === 'online' || serverStatus === 'starting'}
            style={{
              backgroundColor: serverStatus === 'online' ? '#27ae60' : '#3498db',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: serverStatus === 'online' || serverStatus === 'starting' ? 'not-allowed' : 'pointer'
            }}
          >
            {serverStatus === 'starting' ? '시작 중...' : '서버 시작'}
          </button>
          
          <button 
            onClick={stopServer} 
            disabled={serverStatus === 'offline' || serverStatus === 'stopping'}
            style={{
              backgroundColor: serverStatus === 'offline' ? '#95a5a6' : '#e74c3c',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: serverStatus === 'offline' || serverStatus === 'stopping' ? 'not-allowed' : 'pointer'
            }}
          >
            {serverStatus === 'stopping' ? '종료 중...' : '서버 종료'}
          </button>
          
          <button 
            onClick={callApi} 
            disabled={serverStatus !== 'online' || isLoading}
            style={{
              backgroundColor: serverStatus !== 'online' || isLoading ? '#95a5a6' : '#f39c12',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: serverStatus !== 'online' || isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? '요청 중...' : 'API 호출'}
          </button>
          
          <button 
            onClick={readFile} 
            disabled={serverStatus !== 'online'}
            style={{
              backgroundColor: serverStatus !== 'online' ? '#95a5a6' : '#9b59b6',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: serverStatus !== 'online' ? 'not-allowed' : 'pointer'
            }}
          >
            파일 읽기
          </button>
        </div>

        {/* 서버 상태 표시 */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: serverStatus === 'online' ? '#d5f4e6' : '#f8d7da',
          border: `1px solid ${serverStatus === 'online' ? '#27ae60' : '#e74c3c'}`,
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>
            서버 상태: 
            <span style={{ 
              color: serverStatus === 'online' ? '#27ae60' : '#e74c3c',
              marginLeft: '10px'
            }}>
              {serverStatus === 'online' ? '🟢 온라인' : 
               serverStatus === 'starting' ? '🟡 시작 중...' :
               serverStatus === 'stopping' ? '🟠 종료 중...' : '🔴 오프라인'}
            </span>
          </p>
        </div>

        {/* API 응답 데이터 */}
        {apiData && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#e8f4fd',
            border: '1px solid #3498db',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>API 응답 데이터:</h4>
            <pre style={{ 
              backgroundColor: '#2c3e50', 
              color: '#ecf0f1', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}

        {/* 파일 내용 */}
        {fileContent && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f0f8ff',
            border: '1px solid #9b59b6',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>파일 내용:</h4>
            <pre style={{ 
              backgroundColor: '#2c3e50', 
              color: '#ecf0f1', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
              {fileContent}
            </pre>
          </div>
        )}
      </div>

      {/* 서버 로그 */}
      <div className="card">
        <h3>3. 서버 로그</h3>
        <div style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '15px', 
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '14px',
          maxHeight: '200px',
          overflowY: 'auto',
          marginBottom: '10px'
        }}>
          {serverLogs.length === 0 ? (
            <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>
              로그가 없습니다. 서버를 시작해보세요!
            </p>
          ) : (
            serverLogs.map((log, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <span style={{ color: '#95a5a6' }}>
                  [{new Date().toLocaleTimeString()}]
                </span>
                <span style={{ marginLeft: '10px' }}>{log}</span>
              </div>
            ))
          )}
        </div>
        <button 
          onClick={clearLogs}
          style={{
            backgroundColor: '#95a5a6',
            color: 'white',
            padding: '5px 15px',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          로그 지우기
        </button>
      </div>

      {/* Node.js 학습 팁 */}
      <div className="card">
        <h3>📝 Node.js 학습 팁</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>JavaScript 기초가 중요:</strong> Node.js는 JavaScript이므로 ES6+ 문법을 잘 알아야 합니다</li>
          <li><strong>비동기 프로그래밍 이해:</strong> Promise, async/await, 콜백 함수를 잘 이해하세요</li>
          <li><strong>NPM 활용:</strong> 필요한 패키지를 적절히 사용하여 개발 효율성을 높이세요</li>
          <li><strong>에러 처리:</strong> try-catch와 에러 핸들링을 습관화하세요</li>
          <li><strong>보안 고려:</strong> 입력 검증, CORS, 인증 등을 고려한 안전한 서버를 만드세요</li>
          <li><strong>성능 최적화:</strong> 메모리 사용량과 응답 시간을 고려한 효율적인 코드를 작성하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default NodejsExample;
