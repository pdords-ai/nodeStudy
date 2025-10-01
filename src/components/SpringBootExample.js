// 필요한 라이브러리를 가져옵니다
import React, { useState, useEffect } from 'react';  // React와 훅들을 가져옵니다

// SpringBootExample 컴포넌트 (Spring Boot 개념을 학습하는 컴포넌트)
// Spring Boot는 Java로 웹 애플리케이션을 쉽게 만들 수 있게 해주는 프레임워크입니다
// 마치 집을 지을 때 기본 골조와 인프라를 제공해주는 것과 같아요
const SpringBootExample = () => {
  // 여러 가지 state들을 선언합니다
  const [serverStatus, setServerStatus] = useState('offline');  // 서버 상태
  const [serverLogs, setServerLogs] = useState([]);            // 서버 로그
  const [users, setUsers] = useState([]);                      // 사용자 목록
  const [isLoading, setIsLoading] = useState(false);           // 로딩 상태
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });  // 새 사용자 데이터
  const [apiResponse, setApiResponse] = useState(null);        // API 응답

  // 1. Spring Boot 기본 개념 설명
  const springBootConcepts = [
    {
      title: "Spring Boot란?",
      description: "Java로 웹 애플리케이션을 쉽고 빠르게 개발할 수 있게 해주는 프레임워크입니다.",
      example: "복잡한 설정 없이도 웹 서버를 바로 실행할 수 있어요!",
      features: [
        "자동 설정 (Auto Configuration)",
        "내장 서버 (Tomcat, Jetty)",
        "의존성 관리 (Dependency Management)",
        "프로덕션 준비 기능 (Production Ready)"
      ]
    },
    {
      title: "Spring Boot vs 일반 Spring",
      description: "기존 Spring과 Spring Boot의 차이점을 비교해봅시다.",
      spring: {
        특징: "수동 설정, 복잡한 XML, 많은 보일러플레이트 코드",
        장점: "세밀한 제어, 유연성",
        단점: "복잡한 설정, 개발 시간 오래 걸림"
      },
      springBoot: {
        특징: "자동 설정, 간단한 어노테이션, 최소한의 코드",
        장점: "빠른 개발, 간단한 설정, 내장 서버",
        단점: "커스터마이징 제한"
      }
    },
    {
      title: "Spring Boot 핵심 어노테이션",
      description: "Spring Boot에서 자주 사용되는 어노테이션들을 알아봅시다.",
      annotations: [
        { name: "@SpringBootApplication", description: "Spring Boot 애플리케이션임을 나타냄" },
        { name: "@RestController", description: "REST API 컨트롤러임을 나타냄" },
        { name: "@Service", description: "비즈니스 로직을 담당하는 서비스 클래스" },
        { name: "@Repository", description: "데이터베이스 접근을 담당하는 리포지토리" },
        { name: "@Entity", description: "데이터베이스 테이블과 매핑되는 엔티티" },
        { name: "@Autowired", description: "의존성을 자동으로 주입" }
      ]
    }
  ];

  // 2. 로그 추가 함수
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setServerLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // 3. Spring Boot 서버 연결 시뮬레이션
  const connectServer = async () => {
    setServerStatus('connecting');
    addLog('Spring Boot 서버 연결 시도 중...');
    
    try {
      // 실제 Spring Boot 서버에 연결 시도
      const response = await fetch('http://localhost:8080/api/users');
      
      if (response.ok) {
        setServerStatus('connected');
        addLog('Spring Boot 서버에 성공적으로 연결되었습니다!');
        addLog('REST API 엔드포인트가 준비되었습니다.');
        loadUsers();
      } else {
        throw new Error('서버 응답 오류');
      }
    } catch (error) {
      setServerStatus('offline');
      addLog('Spring Boot 서버 연결 실패: ' + error.message);
      addLog('서버가 실행 중인지 확인해주세요. (http://localhost:8080)');
    }
  };

  // 4. 서버 연결 해제
  const disconnectServer = () => {
    setServerStatus('disconnected');
    addLog('Spring Boot 서버 연결이 해제되었습니다.');
    setUsers([]);
    setApiResponse(null);
  };

  // 5. 사용자 목록 로드
  const loadUsers = async () => {
    if (serverStatus !== 'connected') return;
    
    setIsLoading(true);
    addLog('사용자 목록을 조회하는 중...');
    
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();
      
      setUsers(data);
      addLog(`${data.length}명의 사용자를 조회했습니다.`);
    } catch (error) {
      addLog('사용자 목록 조회 실패: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 6. 새 사용자 추가
  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.age) {
      addLog('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    addLog(`새 사용자 추가 중: ${newUser.name}`);
    
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });
      
      if (response.ok) {
        const user = await response.json();
        setUsers(prev => [...prev, user]);
        setNewUser({ name: '', email: '', age: '' });
        addLog(`사용자 '${user.name}'이 성공적으로 추가되었습니다.`);
      } else {
        const error = await response.json();
        addLog(`사용자 추가 실패: ${error.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      addLog(`사용자 추가 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 7. 사용자 삭제
  const deleteUser = async (id) => {
    setIsLoading(true);
    addLog(`사용자 삭제 중: ID ${id}`);
    
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setUsers(prev => prev.filter(user => user.id !== id));
        addLog(`사용자 ID ${id}가 삭제되었습니다.`);
      } else {
        addLog(`사용자 삭제 실패: ${response.status}`);
      }
    } catch (error) {
      addLog(`사용자 삭제 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 8. 사용자 수정
  const updateUser = async (id, updatedData) => {
    setIsLoading(true);
    addLog(`사용자 수정 중: ID ${id}`);
    
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
      
      if (response.ok) {
        const user = await response.json();
        setUsers(prev => prev.map(u => u.id === id ? user : u));
        addLog(`사용자 ID ${id}가 수정되었습니다.`);
      } else {
        addLog(`사용자 수정 실패: ${response.status}`);
      }
    } catch (error) {
      addLog(`사용자 수정 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 9. API 테스트
  const testApi = async (endpoint) => {
    setIsLoading(true);
    addLog(`${endpoint} API 테스트 중...`);
    
    try {
      const response = await fetch(`http://localhost:8080/api${endpoint}`);
      const data = await response.json();
      
      setApiResponse({ endpoint, data, status: response.status });
      addLog(`${endpoint} API 테스트 완료 (상태: ${response.status})`);
    } catch (error) {
      setApiResponse({ endpoint, error: error.message, status: 'ERROR' });
      addLog(`${endpoint} API 테스트 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 10. 로그 정리
  const clearLogs = () => {
    setServerLogs([]);
  };

  // 11. 컴포넌트 마운트 시 초기 로그
  useEffect(() => {
    addLog('Spring Boot 예제가 로드되었습니다.');
  }, []);

  return (
    <div className="section">
      <h2>☕ Spring Boot 예제</h2>
      
      {/* Spring Boot 기본 개념 설명 */}
      <div className="card">
        <h3>1. Spring Boot 기본 개념</h3>
        <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
          {springBootConcepts.map((concept, index) => (
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
              
              {concept.features && (
                <div style={{ marginBottom: '15px' }}>
                  <strong>주요 특징:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    {concept.features.map((feature, i) => (
                      <li key={i} style={{ margin: '3px 0' }}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {concept.spring && concept.springBoot && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ 
                    backgroundColor: '#e8f4fd', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid #3498db'
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Spring</h5>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>특징:</strong> {concept.spring.특징}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>장점:</strong> {concept.spring.장점}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>단점:</strong> {concept.spring.단점}</p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#f0f8ff', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid #9b59b6'
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Spring Boot</h5>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>특징:</strong> {concept.springBoot.특징}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>장점:</strong> {concept.springBoot.장점}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>단점:</strong> {concept.springBoot.단점}</p>
                  </div>
                </div>
              )}
              
              {concept.annotations && (
                <div style={{ marginTop: '15px' }}>
                  <strong>주요 어노테이션:</strong>
                  <div style={{ display: 'grid', gap: '5px', marginTop: '10px' }}>
                    {concept.annotations.map((annotation, i) => (
                      <div key={i} style={{ 
                        backgroundColor: '#2c3e50', 
                        color: '#ecf0f1', 
                        padding: '8px', 
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        <strong>{annotation.name}</strong>: {annotation.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Spring Boot 서버 연결 */}
      <div className="card">
        <h3>2. Spring Boot 서버 연결</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={connectServer} 
            disabled={serverStatus === 'connected' || serverStatus === 'connecting'}
            style={{
              backgroundColor: serverStatus === 'connected' ? '#27ae60' : '#3498db',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: serverStatus === 'connected' || serverStatus === 'connecting' ? 'not-allowed' : 'pointer'
            }}
          >
            {serverStatus === 'connecting' ? '연결 중...' : 'Spring Boot 서버 연결'}
          </button>
          
          <button 
            onClick={disconnectServer} 
            disabled={serverStatus === 'disconnected' || serverStatus === 'connecting'}
            style={{
              backgroundColor: serverStatus === 'disconnected' ? '#95a5a6' : '#e74c3c',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: serverStatus === 'disconnected' || serverStatus === 'connecting' ? 'not-allowed' : 'pointer'
            }}
          >
            연결 해제
          </button>
        </div>

        {/* 연결 상태 표시 */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: serverStatus === 'connected' ? '#d5f4e6' : '#f8d7da',
          border: `1px solid ${serverStatus === 'connected' ? '#27ae60' : '#e74c3c'}`,
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>
            서버 상태: 
            <span style={{ 
              color: serverStatus === 'connected' ? '#27ae60' : '#e74c3c',
              marginLeft: '10px'
            }}>
              {serverStatus === 'connected' ? '🟢 연결됨' : 
               serverStatus === 'connecting' ? '🟡 연결 중...' : '🔴 연결 안됨'}
            </span>
          </p>
        </div>
      </div>

      {/* 사용자 관리 (CRUD) */}
      <div className="card">
        <h3>3. 사용자 관리 (CRUD 작업)</h3>
        
        {/* 새 사용자 추가 폼 */}
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '15px',
          backgroundColor: '#f8f9fa',
          marginBottom: '20px'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>새 사용자 추가</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="이름"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '120px' }}
            />
            <input
              type="email"
              placeholder="이메일"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '180px' }}
            />
            <input
              type="number"
              placeholder="나이"
              value={newUser.age}
              onChange={(e) => setNewUser({...newUser, age: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '80px' }}
            />
            <button 
              onClick={addUser}
              disabled={serverStatus !== 'connected' || isLoading}
              style={{
                backgroundColor: serverStatus !== 'connected' || isLoading ? '#95a5a6' : '#27ae60',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: serverStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? '추가 중...' : '추가'}
            </button>
          </div>
        </div>

        {/* 사용자 목록 */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>사용자 목록</h4>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              데이터를 로딩 중...
            </div>
          ) : users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              사용자 데이터가 없습니다.
            </div>
          ) : (
            <div style={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '12px', border: '1px solid #e0e0e0', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '12px', border: '1px solid #e0e0e0', textAlign: 'left' }}>이름</th>
                    <th style={{ padding: '12px', border: '1px solid #e0e0e0', textAlign: 'left' }}>이메일</th>
                    <th style={{ padding: '12px', border: '1px solid #e0e0e0', textAlign: 'left' }}>나이</th>
                    <th style={{ padding: '12px', border: '1px solid #e0e0e0', textAlign: 'left' }}>생성일</th>
                    <th style={{ padding: '12px', border: '1px solid #e0e0e0', textAlign: 'left' }}>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={{ padding: '12px', border: '1px solid #e0e0e0' }}>{user.id}</td>
                      <td style={{ padding: '12px', border: '1px solid #e0e0e0' }}>{user.name}</td>
                      <td style={{ padding: '12px', border: '1px solid #e0e0e0' }}>{user.email}</td>
                      <td style={{ padding: '12px', border: '1px solid #e0e0e0' }}>{user.age}</td>
                      <td style={{ padding: '12px', border: '1px solid #e0e0e0' }}>{user.createdAt}</td>
                      <td style={{ padding: '12px', border: '1px solid #e0e0e0' }}>
                        <button 
                          onClick={() => updateUser(user.id, { name: user.name + ' (수정됨)' })}
                          disabled={serverStatus !== 'connected' || isLoading}
                          style={{
                            backgroundColor: serverStatus !== 'connected' || isLoading ? '#95a5a6' : '#f39c12',
                            color: 'white',
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: serverStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            marginRight: '5px'
                          }}
                        >
                          수정
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          disabled={serverStatus !== 'connected' || isLoading}
                          style={{
                            backgroundColor: serverStatus !== 'connected' || isLoading ? '#95a5a6' : '#e74c3c',
                            color: 'white',
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: serverStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* API 테스트 */}
      <div className="card">
        <h3>4. REST API 테스트</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => testApi('/users')}
            disabled={serverStatus !== 'connected' || isLoading}
            style={{
              backgroundColor: serverStatus !== 'connected' || isLoading ? '#95a5a6' : '#3498db',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: serverStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            GET /users
          </button>
          
          <button 
            onClick={() => testApi('/users/statistics')}
            disabled={serverStatus !== 'connected' || isLoading}
            style={{
              backgroundColor: serverStatus !== 'connected' || isLoading ? '#95a5a6' : '#9b59b6',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: serverStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            GET /statistics
          </button>
        </div>

        {/* API 응답 표시 */}
        {apiResponse && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: apiResponse.status === 'ERROR' ? '#f8d7da' : '#d4edda',
            border: `1px solid ${apiResponse.status === 'ERROR' ? '#e74c3c' : '#27ae60'}`,
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              API 응답: {apiResponse.endpoint}
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
        <h3>5. 서버 로그</h3>
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
              로그가 없습니다. Spring Boot 서버에 연결해보세요!
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

      {/* Spring Boot 학습 팁 */}
      <div className="card">
        <h3>📝 Spring Boot 학습 팁</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>어노테이션 이해:</strong> @SpringBootApplication, @RestController 등 핵심 어노테이션을 익히세요</li>
          <li><strong>의존성 주입:</strong> @Autowired를 사용한 의존성 주입 패턴을 이해하세요</li>
          <li><strong>REST API 설계:</strong> RESTful 원칙에 따라 API를 설계하세요</li>
          <li><strong>데이터베이스 연동:</strong> JPA와 Hibernate를 활용한 데이터 영속성을 학습하세요</li>
          <li><strong>예외 처리:</strong> @ControllerAdvice를 사용한 전역 예외 처리를 구현하세요</li>
          <li><strong>보안 고려:</strong> Spring Security를 활용한 인증과 인가를 구현하세요</li>
          <li><strong>테스트 작성:</strong> @SpringBootTest를 사용한 통합 테스트를 작성하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default SpringBootExample;
