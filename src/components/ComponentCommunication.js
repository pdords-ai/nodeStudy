import React, { useState, createContext, useContext } from 'react';

// 1. Context API를 사용한 전역 상태 관리
const ThemeContext = createContext();
const UserContext = createContext();

// Context Provider 컴포넌트
const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

// 2. Props를 통한 부모-자식 통신
const ParentComponent = () => {
  const [message, setMessage] = useState('부모에서 자식으로 전달하는 메시지');
  const [childData, setChildData] = useState('');

  const handleChildMessage = (data) => {
    setChildData(data);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #3498db', borderRadius: '8px', margin: '10px 0' }}>
      <h3>부모 컴포넌트</h3>
      <p>자식에게 보낼 메시지: <strong>{message}</strong></p>
      <p>자식이 보낸 데이터: <strong>{childData || '아직 없음'}</strong></p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="자식에게 보낼 메시지 입력"
        style={{ marginTop: '10px', padding: '5px', width: '300px' }}
      />
      <ChildComponent 
        message={message} 
        onSendData={handleChildMessage}
      />
    </div>
  );
};

const ChildComponent = ({ message, onSendData }) => {
  const [childMessage, setChildMessage] = useState('');

  const sendToParent = () => {
    onSendData(childMessage);
  };

  return (
    <div style={{ padding: '15px', border: '2px solid #e74c3c', borderRadius: '8px', marginTop: '10px' }}>
      <h4>자식 컴포넌트</h4>
      <p>부모가 보낸 메시지: <strong>{message}</strong></p>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={childMessage}
          onChange={(e) => setChildMessage(e.target.value)}
          placeholder="부모에게 보낼 메시지 입력"
          style={{ padding: '5px', width: '250px', marginRight: '10px' }}
        />
        <button onClick={sendToParent}>부모에게 전송</button>
      </div>
    </div>
  );
};

// 3. Context를 사용한 컴포넌트들
const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#2c3e50' : '#f39c12',
        color: theme === 'light' ? 'white' : 'black',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
    </button>
  );
};

const ThemeDisplay = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: theme === 'light' ? '#ffffff' : '#2c3e50',
      color: theme === 'light' ? '#333333' : '#ffffff',
      border: `2px solid ${theme === 'light' ? '#ddd' : '#34495e'}`,
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h3>테마 표시 컴포넌트</h3>
      <p>현재 테마: <strong>{theme === 'light' ? '라이트 테마' : '다크 테마'}</strong></p>
      <p>이 컴포넌트는 Context를 통해 테마 정보를 받아옵니다.</p>
    </div>
  );
};

const UserProfile = () => {
  const { user, logout } = useContext(UserContext);
  
  return (
    <div style={{ padding: '20px', border: '2px solid #27ae60', borderRadius: '8px', margin: '10px 0' }}>
      <h3>사용자 프로필</h3>
      {user ? (
        <div>
          <p>이름: <strong>{user.name}</strong></p>
          <p>이메일: <strong>{user.email}</strong></p>
          <p>역할: <strong>{user.role}</strong></p>
          <button onClick={logout} style={{ marginTop: '10px', padding: '5px 15px' }}>
            로그아웃
          </button>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      login(formData);
      setFormData({ name: '', email: '', role: 'user' });
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #f39c12', borderRadius: '8px', margin: '10px 0' }}>
      <h3>로그인 폼</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ padding: '5px', marginRight: '10px', width: '150px' }}
          />
          <input
            type="email"
            placeholder="이메일"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ padding: '5px', marginRight: '10px', width: '150px' }}
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            style={{ padding: '5px', marginRight: '10px' }}
          >
            <option value="user">일반 사용자</option>
            <option value="admin">관리자</option>
          </select>
          <button type="submit" style={{ padding: '5px 15px' }}>로그인</button>
        </div>
      </form>
    </div>
  );
};

// 4. 이벤트 버스 패턴 (간단한 구현)
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

const eventBus = new EventBus();

const EventSender = () => {
  const [message, setMessage] = useState('');

  const sendEvent = () => {
    eventBus.emit('message', { 
      text: message, 
      timestamp: new Date().toLocaleString() 
    });
    setMessage('');
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #9b59b6', borderRadius: '8px', margin: '10px 0' }}>
      <h3>이벤트 발신자</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="이벤트 메시지 입력"
        style={{ padding: '5px', marginRight: '10px', width: '200px' }}
      />
      <button onClick={sendEvent}>이벤트 전송</button>
    </div>
  );
};

const EventReceiver = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);

  React.useEffect(() => {
    const handleMessage = (data) => {
      setReceivedMessages(prev => [...prev, data]);
    };

    eventBus.on('message', handleMessage);

    return () => {
      eventBus.off('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '2px solid #e67e22', borderRadius: '8px', margin: '10px 0' }}>
      <h3>이벤트 수신자</h3>
      <p>받은 메시지:</p>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {receivedMessages.length === 0 ? (
          <p>아직 받은 메시지가 없습니다.</p>
        ) : (
          receivedMessages.map((msg, index) => (
            <div key={index} style={{ 
              padding: '5px', 
              margin: '5px 0', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '3px' 
            }}>
              <strong>{msg.text}</strong> <small>({msg.timestamp})</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 5. Render Props 패턴
const DataProvider = ({ children }) => {
  const [data, setData] = useState([
    { id: 1, name: '아이템 1', value: 100 },
    { id: 2, name: '아이템 2', value: 200 },
    { id: 3, name: '아이템 3', value: 300 }
  ]);

  const addItem = (item) => {
    setData(prev => [...prev, { id: Date.now(), ...item }]);
  };

  const removeItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  return children({ data, addItem, removeItem });
};

const DataDisplay = () => {
  const [newItem, setNewItem] = useState({ name: '', value: '' });

  const handleAdd = (addItem) => {
    if (newItem.name && newItem.value) {
      addItem({ name: newItem.name, value: parseInt(newItem.value) });
      setNewItem({ name: '', value: '' });
    }
  };

  return (
    <DataProvider>
      {({ data, addItem, removeItem }) => (
        <div style={{ padding: '20px', border: '2px solid #1abc9c', borderRadius: '8px', margin: '10px 0' }}>
          <h3>Render Props 패턴</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="아이템 이름"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              style={{ padding: '5px', marginRight: '10px', width: '120px' }}
            />
            <input
              type="number"
              placeholder="값"
              value={newItem.value}
              onChange={(e) => setNewItem({...newItem, value: e.target.value})}
              style={{ padding: '5px', marginRight: '10px', width: '80px' }}
            />
            <button onClick={() => handleAdd(addItem)}>추가</button>
          </div>

          <div>
            {data.map(item => (
              <div key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '5px',
                border: '1px solid #ddd',
                borderRadius: '3px',
                margin: '5px 0'
              }}>
                <span>{item.name} - {item.value}</span>
                <button 
                  onClick={() => removeItem(item.id)}
                  style={{ fontSize: '12px', padding: '2px 6px' }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </DataProvider>
  );
};

const ComponentCommunication = () => {
  return (
    <AppProvider>
      <div className="section">
        <h2>🔄 컴포넌트 간 통신 예제</h2>
        
        <div className="card">
          <h3>1. Props를 통한 부모-자식 통신</h3>
          <ParentComponent />
        </div>

        <div className="card">
          <h3>2. Context API를 통한 전역 상태 관리</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <ThemeButton />
          </div>
          <ThemeDisplay />
          <LoginForm />
          <UserProfile />
        </div>

        <div className="card">
          <h3>3. 이벤트 버스 패턴</h3>
          <p>컴포넌트 간 직접적인 참조 없이 이벤트를 통한 통신</p>
          <EventSender />
          <EventReceiver />
        </div>

        <div className="card">
          <h3>4. Render Props 패턴</h3>
          <p>함수를 children으로 받아 데이터와 로직을 공유</p>
          <DataDisplay />
        </div>

        <div className="card">
          <h3>📝 컴포넌트 통신 패턴 비교</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>패턴</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>사용 시기</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>장점</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>단점</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Props</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>직접적인 부모-자식 관계</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>단순하고 명확함</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>깊은 중첩 시 복잡</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Context API</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>전역 상태 관리</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Prop Drilling 해결</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>과도한 사용 시 복잡</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>이벤트 버스</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>느슨한 결합 필요</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>유연한 통신</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>디버깅 어려움</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Render Props</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>로직 재사용</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>높은 재사용성</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>코드 가독성 저하</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppProvider>
  );
};

export default ComponentCommunication;
