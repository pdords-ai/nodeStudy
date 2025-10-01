// 필요한 라이브러리를 가져옵니다
import React, { useState, useEffect } from 'react';  // React와 훅들을 가져옵니다

// ExpressServerExample 컴포넌트 (Express.js 서버 개념을 학습하는 컴포넌트)
// Express.js는 Node.js로 웹서버를 쉽게 만들 수 있게 해주는 프레임워크입니다
// 마치 집을 지을 때 기본 골조를 제공해주는 것과 같아요
const ExpressServerExample = () => {
  // 여러 가지 state들을 선언합니다
  const [serverStatus, setServerStatus] = useState('offline');  // 서버 상태
  const [serverLogs, setServerLogs] = useState([]);            // 서버 로그
  const [apiResponse, setApiResponse] = useState(null);        // API 응답
  const [isLoading, setIsLoading] = useState(false);           // 로딩 상태
  const [requestMethod, setRequestMethod] = useState('GET');   // 요청 메서드
  const [requestPath, setRequestPath] = useState('/api/users'); // 요청 경로

  // 1. Express.js 기본 개념 설명
  const expressConcepts = [
    {
      title: "Express.js란?",
      description: "Node.js로 웹서버를 쉽게 만들 수 있게 해주는 웹 프레임워크입니다.",
      example: "복잡한 서버 코드를 간단하게 작성할 수 있어요!",
      code: `// Express 서버 기본 구조
const express = require('express');
const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());

// 라우트 정의
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(\`서버가 \${PORT}번 포트에서 실행 중입니다!\`);
});`
    },
    {
      title: "라우팅 (Routing)",
      description: "URL 경로에 따라 다른 처리를 하는 기능입니다.",
      example: "각각의 URL에 맞는 페이지나 데이터를 제공할 수 있어요!",
      code: `// 다양한 라우트 예제
app.get('/users', (req, res) => {
  res.json({ users: ['김철수', '이영희', '박민수'] });
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  res.json({ message: '사용자가 추가되었습니다.', user: newUser });
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: \`사용자 \${userId}가 수정되었습니다.\` });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: \`사용자 \${userId}가 삭제되었습니다.\` });
});`
    },
    {
      title: "미들웨어 (Middleware)",
      description: "요청과 응답 사이에서 실행되는 함수들입니다.",
      example: "로그 기록, 인증, 데이터 변환 등을 자동으로 처리할 수 있어요!",
      code: `// 미들웨어 예제
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next(); // 다음 미들웨어로 넘어가기
});

// CORS 미들웨어
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// JSON 파싱 미들웨어
app.use(express.json());`
    },
    {
      title: "정적 파일 서빙",
      description: "HTML, CSS, JavaScript 파일들을 직접 제공하는 기능입니다.",
      example: "웹사이트의 정적 파일들을 쉽게 서빙할 수 있어요!",
      code: `// 정적 파일 서빙
app.use(express.static('public'));

// 이제 public 폴더의 파일들이 직접 접근 가능합니다
// http://localhost:3000/style.css
// http://localhost:3000/script.js
// http://localhost:3000/index.html`
    }
  ];

  // 2. 서버 시작/종료 시뮬레이션
  const startServer = () => {
    setServerStatus('starting');
    addLog('Express 서버 시작 중...');
    
    setTimeout(() => {
      setServerStatus('online');
      addLog('Express 서버가 성공적으로 시작되었습니다!');
      addLog('포트 3000에서 대기 중...');
      addLog('사용 가능한 엔드포인트:');
      addLog('  GET  /api/users - 사용자 목록 조회');
      addLog('  POST /api/users - 새 사용자 추가');
      addLog('  PUT  /api/users/:id - 사용자 수정');
      addLog('  DELETE /api/users/:id - 사용자 삭제');
    }, 2000);
  };

  const stopServer = () => {
    setServerStatus('stopping');
    addLog('Express 서버 종료 중...');
    
    setTimeout(() => {
      setServerStatus('offline');
      addLog('Express 서버가 종료되었습니다.');
      setApiResponse(null);
    }, 1000);
  };

  // 3. 로그 추가 함수
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setServerLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // 4. API 요청 시뮬레이션
  const makeApiRequest = async () => {
    if (serverStatus !== 'online') {
      addLog('서버가 실행되지 않았습니다. 먼저 서버를 시작하세요.');
      return;
    }

    setIsLoading(true);
    addLog(`${requestMethod} ${requestPath} 요청 시작...`);

    try {
      // 실제 API 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let mockResponse;
      
      switch (requestPath) {
        case '/api/users':
          if (requestMethod === 'GET') {
            mockResponse = {
              success: true,
              data: [
                { id: 1, name: '김철수', email: 'kim@example.com' },
                { id: 2, name: '이영희', email: 'lee@example.com' },
                { id: 3, name: '박민수', email: 'park@example.com' }
              ],
              message: '사용자 목록을 성공적으로 조회했습니다.'
            };
          } else if (requestMethod === 'POST') {
            mockResponse = {
              success: true,
              data: { id: 4, name: '새 사용자', email: 'new@example.com' },
              message: '새 사용자가 성공적으로 추가되었습니다.'
            };
          }
          break;
        case '/api/posts':
          mockResponse = {
            success: true,
            data: [
              { id: 1, title: 'Express.js 기초', content: 'Express.js의 기본 사용법을 알아봅시다.' },
              { id: 2, title: '라우팅 심화', content: '고급 라우팅 기법을 학습해봅시다.' }
            ],
            message: '게시글 목록을 성공적으로 조회했습니다.'
          };
          break;
        default:
          mockResponse = {
            success: false,
            error: '404 Not Found',
            message: '요청한 엔드포인트를 찾을 수 없습니다.'
          };
      }
      
      setApiResponse(mockResponse);
      addLog(`${requestMethod} ${requestPath} 응답 완료 (${mockResponse.success ? '성공' : '실패'})`);
    } catch (error) {
      const errorResponse = {
        success: false,
        error: '500 Internal Server Error',
        message: '서버 내부 오류가 발생했습니다.'
      };
      setApiResponse(errorResponse);
      addLog(`${requestMethod} ${requestPath} 요청 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. 로그 정리
  const clearLogs = () => {
    setServerLogs([]);
  };

  // 6. 컴포넌트 마운트 시 초기 로그
  useEffect(() => {
    addLog('Express 서버 예제가 로드되었습니다.');
  }, []);

  return (
    <div className="section">
      <h2>🚀 Express.js 서버 예제</h2>
      
      {/* Express.js 기본 개념 설명 */}
      <div className="card">
        <h3>1. Express.js 기본 개념</h3>
        <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
          {expressConcepts.map((concept, index) => (
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

      {/* 서버 제어 */}
      <div className="card">
        <h3>2. Express 서버 제어</h3>
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
      </div>

      {/* API 테스트 */}
      <div className="card">
        <h3>3. API 엔드포인트 테스트</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={requestMethod}
            onChange={(e) => setRequestMethod(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          
          <select
            value={requestPath}
            onChange={(e) => setRequestPath(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="/api/users">/api/users</option>
            <option value="/api/posts">/api/posts</option>
            <option value="/api/invalid">/api/invalid (404 테스트)</option>
          </select>
          
          <button 
            onClick={makeApiRequest} 
            disabled={serverStatus !== 'online' || isLoading}
            style={{
              backgroundColor: serverStatus !== 'online' || isLoading ? '#95a5a6' : '#f39c12',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: serverStatus !== 'online' || isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? '요청 중...' : 'API 요청'}
          </button>
        </div>

        {/* API 응답 표시 */}
        {apiResponse && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: apiResponse.success ? '#d4edda' : '#f8d7da',
            border: `1px solid ${apiResponse.success ? '#27ae60' : '#e74c3c'}`,
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              API 응답 ({apiResponse.success ? '성공' : '실패'})
            </h4>
            <pre style={{ 
              backgroundColor: '#2c3e50', 
              color: '#ecf0f1', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* 서버 로그 */}
      <div className="card">
        <h3>4. 서버 로그</h3>
        <div style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '15px', 
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '14px',
          maxHeight: '300px',
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
                {log}
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

      {/* Express.js 학습 팁 */}
      <div className="card">
        <h3>📝 Express.js 학습 팁</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>라우팅 구조:</strong> RESTful API 설계 원칙을 따라 라우트를 구성하세요</li>
          <li><strong>미들웨어 활용:</strong> 인증, 로깅, 에러 처리 등을 미들웨어로 구현하세요</li>
          <li><strong>에러 처리:</strong> try-catch와 에러 핸들링 미들웨어를 적절히 사용하세요</li>
          <li><strong>보안 고려:</strong> helmet, cors, rate limiting 등을 활용하여 보안을 강화하세요</li>
          <li><strong>환경 변수:</strong> dotenv를 사용하여 설정을 환경별로 관리하세요</li>
          <li><strong>데이터베이스 연동:</strong> MongoDB, MySQL 등과 연동하여 실제 데이터를 다루세요</li>
          <li><strong>API 문서화:</strong> Swagger 등을 사용하여 API 문서를 자동 생성하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpressServerExample;
