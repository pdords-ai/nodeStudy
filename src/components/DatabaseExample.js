// 필요한 라이브러리를 가져옵니다
import React, { useState, useEffect } from 'react';  // React와 훅들을 가져옵니다

// DatabaseExample 컴포넌트 (데이터베이스 연동 개념을 학습하는 컴포넌트)
// 데이터베이스는 정보를 체계적으로 저장하고 관리하는 시스템입니다
// 마치 도서관의 책장처럼 정보를 정리해서 보관하는 것과 같아요
const DatabaseExample = () => {
  // 여러 가지 state들을 선언합니다
  const [dbType, setDbType] = useState('sqlite');  // 데이터베이스 타입
  const [connectionStatus, setConnectionStatus] = useState('disconnected');  // 연결 상태
  const [dbLogs, setDbLogs] = useState([]);  // 데이터베이스 로그
  const [users, setUsers] = useState([]);  // 사용자 데이터
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });  // 새 사용자 데이터

  // 1. 데이터베이스 기본 개념 설명
  const dbConcepts = [
    {
      title: "데이터베이스란?",
      description: "정보를 체계적으로 저장하고 관리하는 시스템입니다.",
      example: "웹사이트의 사용자 정보, 게시글, 댓글 등을 저장할 수 있어요!",
      types: ["SQLite", "MySQL", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      title: "SQL vs NoSQL",
      description: "데이터를 저장하는 방식에 따른 분류입니다.",
      example: "SQL은 표 형태로, NoSQL은 문서 형태로 데이터를 저장해요!",
      sql: {
        특징: "구조화된 데이터, ACID 특성, 복잡한 쿼리",
        장점: "일관성, 복잡한 관계 처리",
        단점: "확장성 제한, 스키마 변경 어려움"
      },
      nosql: {
        특징: "유연한 스키마, 높은 확장성, 다양한 데이터 타입",
        장점: "빠른 개발, 수평적 확장",
        단점: "일관성 보장 어려움, 복잡한 쿼리 제한"
      }
    },
    {
      title: "CRUD 작업",
      description: "데이터베이스의 기본적인 4가지 작업입니다.",
      example: "Create(생성), Read(읽기), Update(수정), Delete(삭제)를 의미해요!",
      operations: [
        { name: "CREATE", description: "새로운 데이터를 생성", sql: "INSERT INTO users (name, email) VALUES ('김철수', 'kim@example.com');" },
        { name: "READ", description: "데이터를 조회", sql: "SELECT * FROM users WHERE age > 25;" },
        { name: "UPDATE", description: "기존 데이터를 수정", sql: "UPDATE users SET email = 'new@example.com' WHERE id = 1;" },
        { name: "DELETE", description: "데이터를 삭제", sql: "DELETE FROM users WHERE id = 1;" }
      ]
    }
  ];

  // 2. 데이터베이스 연결 시뮬레이션
  const connectDatabase = () => {
    setConnectionStatus('connecting');
    addLog(`${dbType} 데이터베이스 연결 시도 중...`);
    
    setTimeout(() => {
      setConnectionStatus('connected');
      addLog(`${dbType} 데이터베이스에 성공적으로 연결되었습니다!`);
      addLog('테이블 구조를 확인하는 중...');
      addLog('users 테이블이 준비되었습니다.');
      loadUsers();
    }, 2000);
  };

  const disconnectDatabase = () => {
    setConnectionStatus('disconnecting');
    addLog('데이터베이스 연결을 종료하는 중...');
    
    setTimeout(() => {
      setConnectionStatus('disconnected');
      addLog('데이터베이스 연결이 종료되었습니다.');
      setUsers([]);
    }, 1000);
  };

  // 3. 로그 추가 함수
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setDbLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // 4. 사용자 데이터 로드 (시뮬레이션)
  const loadUsers = async () => {
    setIsLoading(true);
    addLog('사용자 데이터를 조회하는 중...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = [
        { id: 1, name: '김철수', email: 'kim@example.com', age: 28, createdAt: '2024-01-15' },
        { id: 2, name: '이영희', email: 'lee@example.com', age: 32, createdAt: '2024-01-16' },
        { id: 3, name: '박민수', email: 'park@example.com', age: 25, createdAt: '2024-01-17' }
      ];
      
      setUsers(mockUsers);
      addLog(`${mockUsers.length}명의 사용자 데이터를 조회했습니다.`);
    } catch (error) {
      addLog(`사용자 데이터 조회 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. 새 사용자 추가
  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.age) {
      addLog('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    addLog(`새 사용자 추가 중: ${newUser.name}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      const user = {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        age: parseInt(newUser.age),
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setUsers(prev => [...prev, user]);
      setNewUser({ name: '', email: '', age: '' });
      addLog(`사용자 '${user.name}'이 성공적으로 추가되었습니다.`);
    } catch (error) {
      addLog(`사용자 추가 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 6. 사용자 삭제
  const deleteUser = async (id) => {
    setIsLoading(true);
    const user = users.find(u => u.id === id);
    addLog(`사용자 삭제 중: ${user?.name}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.filter(u => u.id !== id));
      addLog(`사용자 '${user?.name}'이 삭제되었습니다.`);
    } catch (error) {
      addLog(`사용자 삭제 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 7. 사용자 수정
  const updateUser = async (id, updatedData) => {
    setIsLoading(true);
    addLog(`사용자 수정 중: ID ${id}`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.map(u => 
        u.id === id ? { ...u, ...updatedData } : u
      ));
      addLog(`사용자 ID ${id}가 수정되었습니다.`);
    } catch (error) {
      addLog(`사용자 수정 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 8. 로그 정리
  const clearLogs = () => {
    setDbLogs([]);
  };

  // 9. 컴포넌트 마운트 시 초기 로그
  useEffect(() => {
    addLog('데이터베이스 예제가 로드되었습니다.');
  }, []);

  return (
    <div className="section">
      <h2>🗄️ 데이터베이스 연동 예제</h2>
      
      {/* 데이터베이스 기본 개념 설명 */}
      <div className="card">
        <h3>1. 데이터베이스 기본 개념</h3>
        <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
          {dbConcepts.map((concept, index) => (
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
              
              {concept.types && (
                <div style={{ marginBottom: '15px' }}>
                  <strong>데이터베이스 종류:</strong>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
                    {concept.types.map((type, i) => (
                      <span key={i} style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {concept.sql && concept.nosql && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ 
                    backgroundColor: '#e8f4fd', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid #3498db'
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>SQL 데이터베이스</h5>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>특징:</strong> {concept.sql.특징}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>장점:</strong> {concept.sql.장점}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>단점:</strong> {concept.sql.단점}</p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#f0f8ff', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid #9b59b6'
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>NoSQL 데이터베이스</h5>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>특징:</strong> {concept.nosql.특징}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>장점:</strong> {concept.nosql.장점}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>단점:</strong> {concept.nosql.단점}</p>
                  </div>
                </div>
              )}
              
              {concept.operations && (
                <div style={{ marginTop: '15px' }}>
                  <strong>CRUD 작업 예제:</strong>
                  {concept.operations.map((op, i) => (
                    <div key={i} style={{ marginTop: '10px' }}>
                      <div style={{ 
                        backgroundColor: '#2c3e50', 
                        color: '#ecf0f1', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                      }}>
                        <strong>{op.name}:</strong> {op.description}
                        <br />
                        <span style={{ color: '#f39c12' }}>{op.sql}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 데이터베이스 연결 */}
      <div className="card">
        <h3>2. 데이터베이스 연결</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={dbType}
            onChange={(e) => setDbType(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="sqlite">SQLite</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
          </select>
          
          <button 
            onClick={connectDatabase} 
            disabled={connectionStatus === 'connected' || connectionStatus === 'connecting'}
            style={{
              backgroundColor: connectionStatus === 'connected' ? '#27ae60' : '#3498db',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: connectionStatus === 'connected' || connectionStatus === 'connecting' ? 'not-allowed' : 'pointer'
            }}
          >
            {connectionStatus === 'connecting' ? '연결 중...' : '데이터베이스 연결'}
          </button>
          
          <button 
            onClick={disconnectDatabase} 
            disabled={connectionStatus === 'disconnected' || connectionStatus === 'disconnecting'}
            style={{
              backgroundColor: connectionStatus === 'disconnected' ? '#95a5a6' : '#e74c3c',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: connectionStatus === 'disconnected' || connectionStatus === 'disconnecting' ? 'not-allowed' : 'pointer'
            }}
          >
            {connectionStatus === 'disconnecting' ? '연결 해제 중...' : '연결 해제'}
          </button>
        </div>

        {/* 연결 상태 표시 */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: connectionStatus === 'connected' ? '#d5f4e6' : '#f8d7da',
          border: `1px solid ${connectionStatus === 'connected' ? '#27ae60' : '#e74c3c'}`,
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>
            데이터베이스 상태: 
            <span style={{ 
              color: connectionStatus === 'connected' ? '#27ae60' : '#e74c3c',
              marginLeft: '10px'
            }}>
              {connectionStatus === 'connected' ? '🟢 연결됨' : 
               connectionStatus === 'connecting' ? '🟡 연결 중...' :
               connectionStatus === 'disconnecting' ? '🟠 연결 해제 중...' : '🔴 연결 안됨'}
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
              disabled={connectionStatus !== 'connected' || isLoading}
              style={{
                backgroundColor: connectionStatus !== 'connected' || isLoading ? '#95a5a6' : '#27ae60',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: connectionStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer'
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
                    <th style={{ padding: '12px', border: '1px solid #e0e0e0', textAlign: 'left' }}>가입일</th>
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
                          disabled={connectionStatus !== 'connected' || isLoading}
                          style={{
                            backgroundColor: connectionStatus !== 'connected' || isLoading ? '#95a5a6' : '#f39c12',
                            color: 'white',
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: connectionStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            marginRight: '5px'
                          }}
                        >
                          수정
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          disabled={connectionStatus !== 'connected' || isLoading}
                          style={{
                            backgroundColor: connectionStatus !== 'connected' || isLoading ? '#95a5a6' : '#e74c3c',
                            color: 'white',
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: connectionStatus !== 'connected' || isLoading ? 'not-allowed' : 'pointer',
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

      {/* 데이터베이스 로그 */}
      <div className="card">
        <h3>4. 데이터베이스 로그</h3>
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
          {dbLogs.length === 0 ? (
            <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>
              로그가 없습니다. 데이터베이스에 연결해보세요!
            </p>
          ) : (
            dbLogs.map((log, index) => (
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

      {/* 데이터베이스 학습 팁 */}
      <div className="card">
        <h3>📝 데이터베이스 학습 팁</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>SQL 기초:</strong> SELECT, INSERT, UPDATE, DELETE 문법을 익히세요</li>
          <li><strong>정규화:</strong> 데이터 중복을 줄이고 일관성을 유지하는 방법을 학습하세요</li>
          <li><strong>인덱싱:</strong> 쿼리 성능을 향상시키는 인덱스 사용법을 알아보세요</li>
          <li><strong>트랜잭션:</strong> 데이터 일관성을 보장하는 트랜잭션 개념을 이해하세요</li>
          <li><strong>ORM 사용:</strong> Sequelize, Prisma 등 ORM을 활용하여 개발 효율성을 높이세요</li>
          <li><strong>보안 고려:</strong> SQL 인젝션 방지, 접근 권한 관리 등을 고려하세요</li>
          <li><strong>성능 최적화:</strong> 쿼리 최적화, 연결 풀링 등을 통해 성능을 개선하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseExample;
