// 필요한 라이브러리를 가져옵니다
import React, { useState, useEffect, useRef } from 'react';  // React와 훅들을 가져옵니다

// WebSocketExample 컴포넌트 (웹소켓 실시간 통신 개념을 학습하는 컴포넌트)
// 웹소켓은 서버와 클라이언트 간의 실시간 양방향 통신을 가능하게 해주는 기술입니다
// 마치 전화처럼 서로 말을 주고받을 수 있는 것과 같아요
const WebSocketExample = () => {
  // 여러 가지 state들을 선언합니다
  const [connectionStatus, setConnectionStatus] = useState('disconnected');  // 연결 상태
  const [messages, setMessages] = useState([]);  // 메시지 목록
  const [newMessage, setNewMessage] = useState('');  // 새 메시지
  const [username, setUsername] = useState('');  // 사용자명
  const [onlineUsers, setOnlineUsers] = useState([]);  // 온라인 사용자 목록
  const [wsLogs, setWsLogs] = useState([]);  // 웹소켓 로그
  const [isTyping, setIsTyping] = useState(false);  // 타이핑 상태
  const [typingUsers, setTypingUsers] = useState([]);  // 타이핑 중인 사용자들
  
  // 웹소켓 연결을 위한 ref
  const wsRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // 1. 웹소켓 기본 개념 설명
  const websocketConcepts = [
    {
      title: "웹소켓이란?",
      description: "서버와 클라이언트 간의 실시간 양방향 통신을 가능하게 해주는 프로토콜입니다.",
      example: "채팅, 실시간 게임, 주식 시세 등에 사용할 수 있어요!",
      features: [
        "실시간 양방향 통신",
        "낮은 지연시간",
        "지속적인 연결",
        "효율적인 데이터 전송"
      ]
    },
    {
      title: "HTTP vs WebSocket",
      description: "기존 HTTP와 웹소켓의 차이점을 비교해봅시다.",
      http: {
        특징: "요청-응답 방식, 단방향 통신, 연결 후 해제",
        장점: "간단한 구현, 캐싱 가능, RESTful API",
        단점: "실시간 통신 어려움, 오버헤드 큼"
      },
      websocket: {
        특징: "양방향 통신, 지속적 연결, 실시간 데이터",
        장점: "실시간 통신, 낮은 지연시간, 효율적",
        단점: "복잡한 구현, 상태 관리 필요"
      }
    },
    {
      title: "웹소켓 연결 과정",
      description: "웹소켓 연결이 어떻게 이루어지는지 단계별로 알아봅시다.",
      steps: [
        "1. 클라이언트가 웹소켓 연결 요청 (HTTP Upgrade 헤더)",
        "2. 서버가 연결 승인 (101 Switching Protocols)",
        "3. HTTP 연결이 웹소켓 연결로 업그레이드",
        "4. 양방향 실시간 통신 시작",
        "5. 연결 종료 시 정리 작업"
      ]
    }
  ];

  // 2. 로그 추가 함수
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setWsLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // 3. 웹소켓 연결 시뮬레이션
  const connectWebSocket = () => {
    if (connectionStatus === 'connected') return;
    
    setConnectionStatus('connecting');
    addLog('웹소켓 연결 시도 중...');
    
    // 실제 웹소켓 대신 시뮬레이션
    setTimeout(() => {
      setConnectionStatus('connected');
      addLog('웹소켓 연결이 성공적으로 설정되었습니다!');
      addLog('서버와 실시간 통신을 시작합니다.');
      
      // 시뮬레이션된 서버 메시지
      setTimeout(() => {
        addMessage('system', '서버', '웹소켓 채팅방에 오신 것을 환영합니다!');
      }, 1000);
      
      // 온라인 사용자 시뮬레이션
      setOnlineUsers(['서버', '봇1', '봇2']);
    }, 2000);
  };

  // 4. 웹소켓 연결 해제
  const disconnectWebSocket = () => {
    if (connectionStatus === 'disconnected') return;
    
    setConnectionStatus('disconnecting');
    addLog('웹소켓 연결을 종료하는 중...');
    
    setTimeout(() => {
      setConnectionStatus('disconnected');
      addLog('웹소켓 연결이 종료되었습니다.');
      setMessages([]);
      setOnlineUsers([]);
      setTypingUsers([]);
    }, 1000);
  };

  // 5. 메시지 추가 함수
  const addMessage = (type, sender, content, timestamp = new Date()) => {
    const message = {
      id: Date.now() + Math.random(),
      type,
      sender,
      content,
      timestamp: timestamp.toLocaleTimeString()
    };
    setMessages(prev => [...prev, message]);
  };

  // 6. 메시지 전송
  const sendMessage = () => {
    if (!newMessage.trim() || connectionStatus !== 'connected') return;
    
    addMessage('user', username || '익명', newMessage);
    addLog(`메시지 전송: ${newMessage}`);
    
    // 타이핑 상태 해제
    setIsTyping(false);
    setTypingUsers(prev => prev.filter(user => user !== (username || '익명')));
    
    // 시뮬레이션된 응답
    setTimeout(() => {
      const responses = [
        '안녕하세요!',
        '좋은 말씀이네요!',
        '그렇군요!',
        '흥미로운 이야기입니다.',
        '맞습니다!',
        '정말요?'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage('bot', '봇', randomResponse);
    }, 1000 + Math.random() * 2000);
    
    setNewMessage('');
  };

  // 7. 타이핑 상태 관리
  const handleTyping = () => {
    if (connectionStatus !== 'connected') return;
    
    setIsTyping(true);
    setTypingUsers(prev => {
      const user = username || '익명';
      if (!prev.includes(user)) {
        return [...prev, user];
      }
      return prev;
    });
    
    // 타이핑 상태 자동 해제
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setTypingUsers(prev => prev.filter(user => user !== (username || '익명')));
    }, 3000);
  };

  // 8. Enter 키로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 9. 로그 정리
  const clearLogs = () => {
    setWsLogs([]);
  };

  // 10. 컴포넌트 마운트 시 초기 로그
  useEffect(() => {
    addLog('웹소켓 예제가 로드되었습니다.');
  }, []);

  // 11. 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="section">
      <h2>🔌 웹소켓 실시간 통신 예제</h2>
      
      {/* 웹소켓 기본 개념 설명 */}
      <div className="card">
        <h3>1. 웹소켓 기본 개념</h3>
        <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
          {websocketConcepts.map((concept, index) => (
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
              
              {concept.http && concept.websocket && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ 
                    backgroundColor: '#e8f4fd', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid #3498db'
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>HTTP</h5>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>특징:</strong> {concept.http.특징}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>장점:</strong> {concept.http.장점}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>단점:</strong> {concept.http.단점}</p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#f0f8ff', 
                    padding: '10px', 
                    borderRadius: '4px',
                    border: '1px solid #9b59b6'
                  }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>WebSocket</h5>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>특징:</strong> {concept.websocket.특징}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>장점:</strong> {concept.websocket.장점}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>단점:</strong> {concept.websocket.단점}</p>
                  </div>
                </div>
              )}
              
              {concept.steps && (
                <div style={{ marginTop: '15px' }}>
                  <strong>연결 과정:</strong>
                  <ol style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    {concept.steps.map((step, i) => (
                      <li key={i} style={{ margin: '3px 0', fontSize: '14px' }}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 웹소켓 연결 제어 */}
      <div className="card">
        <h3>2. 웹소켓 연결 제어</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="사용자명 (선택사항)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '150px' }}
          />
          
          <button 
            onClick={connectWebSocket} 
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
            {connectionStatus === 'connecting' ? '연결 중...' : '웹소켓 연결'}
          </button>
          
          <button 
            onClick={disconnectWebSocket} 
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
            웹소켓 상태: 
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

        {/* 온라인 사용자 목록 */}
        {connectionStatus === 'connected' && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e8f4fd',
            border: '1px solid #3498db',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            <strong>온라인 사용자:</strong>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
              {onlineUsers.map((user, index) => (
                <span key={index} style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {user}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 실시간 채팅 */}
      <div className="card">
        <h3>3. 실시간 채팅</h3>
        
        {/* 채팅 메시지 목록 */}
        <div style={{ 
          height: '300px', 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#fafafa',
          overflowY: 'auto',
          marginBottom: '15px'
        }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
              아직 메시지가 없습니다. 메시지를 입력해보세요!
            </div>
          ) : (
            messages.map(message => (
              <div key={message.id} style={{ 
                marginBottom: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: message.type === 'user' ? '#3498db' : 
                               message.type === 'system' ? '#95a5a6' : '#27ae60',
                color: 'white',
                maxWidth: '80%',
                marginLeft: message.type === 'user' ? 'auto' : '0',
                marginRight: message.type === 'user' ? '0' : 'auto'
              }}>
                <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '3px' }}>
                  {message.sender} • {message.timestamp}
                </div>
                <div>{message.content}</div>
              </div>
            ))
          )}
          
          {/* 타이핑 표시 */}
          {typingUsers.length > 0 && (
            <div style={{ 
              color: '#666', 
              fontStyle: 'italic', 
              fontSize: '14px',
              marginTop: '10px'
            }}>
              {typingUsers.join(', ')} {typingUsers.length === 1 ? '이' : '들이'} 타이핑 중...
            </div>
          )}
        </div>

        {/* 메시지 입력 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder={connectionStatus === 'connected' ? '메시지를 입력하세요...' : '먼저 웹소켓에 연결하세요'}
            disabled={connectionStatus !== 'connected'}
            style={{ 
              flex: 1, 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              resize: 'vertical',
              minHeight: '40px',
              maxHeight: '100px'
            }}
          />
          <button 
            onClick={sendMessage}
            disabled={connectionStatus !== 'connected' || !newMessage.trim()}
            style={{
              backgroundColor: connectionStatus !== 'connected' || !newMessage.trim() ? '#95a5a6' : '#3498db',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: connectionStatus !== 'connected' || !newMessage.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            전송
          </button>
        </div>
      </div>

      {/* 웹소켓 로그 */}
      <div className="card">
        <h3>4. 웹소켓 로그</h3>
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
          {wsLogs.length === 0 ? (
            <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>
              로그가 없습니다. 웹소켓에 연결해보세요!
            </p>
          ) : (
            wsLogs.map((log, index) => (
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

      {/* 웹소켓 학습 팁 */}
      <div className="card">
        <h3>📝 웹소켓 학습 팁</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>Socket.io 사용:</strong> 복잡한 웹소켓 구현을 쉽게 해주는 라이브러리입니다</li>
          <li><strong>연결 상태 관리:</strong> 연결, 재연결, 에러 처리를 적절히 구현하세요</li>
          <li><strong>메시지 형식:</strong> JSON을 사용하여 구조화된 메시지를 주고받으세요</li>
          <li><strong>방 개념:</strong> 채팅방, 게임방 등으로 사용자를 그룹화하세요</li>
          <li><strong>이벤트 기반:</strong> 메시지 타입별로 이벤트를 분리하여 관리하세요</li>
          <li><strong>성능 최적화:</strong> 메시지 큐잉, 배치 처리 등을 고려하세요</li>
          <li><strong>보안 고려:</strong> 인증, 권한 관리, 메시지 검증을 구현하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default WebSocketExample;
