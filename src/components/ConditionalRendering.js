import React, { useState } from 'react';

const ConditionalRendering = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleLogin = () => {
    setUser({ name: '홍길동', role: 'user' });
    setIsLoggedIn(true);
    setNotifications(['환영합니다!', '새로운 메시지가 있습니다.']);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setNotifications([]);
  };

  const addNotification = () => {
    const newNotification = `알림 ${notifications.length + 1}`;
    setNotifications([...notifications, newNotification]);
  };

  const removeNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="section">
      <h2>🎭 조건부 렌더링 예제</h2>
      
      {/* 1. 기본 조건부 렌더링 */}
      <div className="card">
        <h3>1. 기본 조건부 렌더링</h3>
        <div>
          <button onClick={handleLogin} disabled={isLoggedIn}>
            로그인
          </button>
          <button onClick={handleLogout} disabled={!isLoggedIn}>
            로그아웃
          </button>
        </div>
        
        {isLoggedIn ? (
          <div className="success">
            <h4>환영합니다, {user.name}님!</h4>
            <p>로그인 상태입니다.</p>
          </div>
        ) : (
          <div className="error">
            <p>로그인이 필요합니다.</p>
          </div>
        )}
      </div>

      {/* 2. && 연산자 사용 */}
      <div className="card">
        <h3>2. && 연산자 사용</h3>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? '세부사항 숨기기' : '세부사항 보기'}
        </button>
        
        {showDetails && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
            <h4>세부 정보</h4>
            <ul>
              <li>React 18.2.0 사용</li>
              <li>JavaScript ES6+ 문법</li>
              <li>함수형 컴포넌트</li>
              <li>Hooks 패턴</li>
            </ul>
          </div>
        )}
      </div>

      {/* 3. 다중 조건 */}
      <div className="card">
        <h3>3. 다중 조건 (사용자 역할에 따른 렌더링)</h3>
        <div>
          <button onClick={() => setUser({ name: '김관리자', role: 'admin' })}>
            관리자로 로그인
          </button>
          <button onClick={() => setUser({ name: '이사용자', role: 'user' })}>
            일반 사용자로 로그인
          </button>
        </div>
        
        {user && (
          <div>
            <p>현재 사용자: <strong>{user.name}</strong></p>
            <p>역할: <strong>{user.role}</strong></p>
            
            {user.role === 'admin' ? (
              <div className="success">
                <h4>관리자 패널</h4>
                <ul>
                  <li>사용자 관리</li>
                  <li>시스템 설정</li>
                  <li>로그 조회</li>
                  <li>데이터베이스 백업</li>
                </ul>
              </div>
            ) : user.role === 'user' ? (
              <div>
                <h4>일반 사용자 메뉴</h4>
                <ul>
                  <li>프로필 수정</li>
                  <li>게시글 작성</li>
                  <li>댓글 작성</li>
                  <li>설정 변경</li>
                </ul>
              </div>
            ) : (
              <p>알 수 없는 역할입니다.</p>
            )}
          </div>
        )}
      </div>

      {/* 4. 배열 길이에 따른 조건부 렌더링 */}
      <div className="card">
        <h3>4. 배열 길이에 따른 조건부 렌더링</h3>
        <button onClick={addNotification}>
          알림 추가
        </button>
        
        {notifications.length === 0 ? (
          <p>새로운 알림이 없습니다.</p>
        ) : notifications.length === 1 ? (
          <div>
            <p>1개의 알림이 있습니다:</p>
            <div className="success">
              {notifications[0]}
              <button 
                onClick={() => removeNotification(0)}
                style={{ marginLeft: '10px', fontSize: '12px', padding: '2px 6px' }}
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{notifications.length}개의 알림이 있습니다:</p>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} style={{ margin: '5px 0' }}>
                  {notification}
                  <button 
                    onClick={() => removeNotification(index)}
                    style={{ marginLeft: '10px', fontSize: '12px', padding: '2px 6px' }}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 5. 테마에 따른 조건부 스타일링 */}
      <div className="card">
        <h3>5. 테마에 따른 조건부 스타일링</h3>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          테마 변경 ({theme === 'light' ? '다크' : '라이트'}로)
        </button>
        
        <div style={{
          marginTop: '15px',
          padding: '15px',
          backgroundColor: theme === 'light' ? '#ffffff' : '#2c3e50',
          color: theme === 'light' ? '#333333' : '#ffffff',
          border: `2px solid ${theme === 'light' ? '#ddd' : '#34495e'}`,
          borderRadius: '8px',
          transition: 'all 0.3s ease'
        }}>
          <h4>테마 예제</h4>
          <p>현재 테마: <strong>{theme === 'light' ? '라이트 테마' : '다크 테마'}</strong></p>
          <p>이 박스의 색상이 테마에 따라 변경됩니다.</p>
        </div>
      </div>

      {/* 6. 복합 조건 */}
      <div className="card">
        <h3>6. 복합 조건</h3>
        <div>
          <p>로그인 상태: {isLoggedIn ? '✅ 로그인됨' : '❌ 로그아웃됨'}</p>
          <p>알림 개수: {notifications.length}</p>
          <p>테마: {theme}</p>
        </div>
        
        {isLoggedIn && notifications.length > 0 && theme === 'dark' && (
          <div className="success">
            <h4>🎉 모든 조건이 만족되었습니다!</h4>
            <p>로그인되어 있고, 알림이 있으며, 다크 테마입니다.</p>
          </div>
        )}
        
        {isLoggedIn && notifications.length === 0 && (
          <div>
            <p>로그인은 되어 있지만 알림이 없습니다.</p>
          </div>
        )}
      </div>

      <div className="card">
        <h3>📝 조건부 렌더링 패턴</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>삼항 연산자 (condition ? true : false):</strong> 두 가지 경우를 모두 처리할 때</li>
          <li><strong>&& 연산자 (condition && element):</strong> 조건이 참일 때만 렌더링</li>
          <li><strong>조기 반환:</strong> 함수 컴포넌트에서 조건이 거짓일 때 null 반환</li>
          <li><strong>변수에 JSX 저장:</strong> 복잡한 조건을 변수에 저장하여 사용</li>
          <li><strong>복합 조건:</strong> 여러 조건을 조합하여 사용</li>
        </ul>
      </div>
    </div>
  );
};

export default ConditionalRendering;
