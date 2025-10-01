// 필요한 라이브러리를 가져옵니다
import React, { useState } from 'react';  // React와 useState 훅을 가져옵니다

// StateExample 컴포넌트 (useState 훅을 학습하는 컴포넌트)
// useState는 컴포넌트에서 데이터를 저장하고 변경할 수 있게 해주는 도구입니다
// 마치 메모지에 숫자를 적고 지우고 다시 적는 것과 같아요
const StateExample = () => {
  // 1. 기본 state 사용법 (숫자 저장하기)
  // useState(0)는 초기값이 0인 숫자를 저장하는 상자입니다
  // count는 현재 값, setCount는 값을 바꾸는 함수입니다
  const [count, setCount] = useState(0);
  
  // 2. 객체 state 사용법 (여러 정보를 한 번에 저장하기)
  // 객체는 여러 정보를 하나로 묶어서 저장하는 방법입니다
  // 마치 명함에 이름, 나이, 이메일을 모두 적는 것과 같아요
  const [user, setUser] = useState({
    name: '홍길동',                    // 이름
    age: 25,                          // 나이
    email: 'hong@example.com'         // 이메일
  });
  
  // 3. 배열 state 사용법 (여러 개의 아이템을 저장하기)
  // 배열은 여러 개의 아이템을 순서대로 저장하는 방법입니다
  // 마치 장보기 목록에 사과, 바나나, 오렌지를 적는 것과 같아요
  const [items, setItems] = useState(['사과', '바나나', '오렌지']);
  
  // 4. 복잡한 state 업데이트 (폼 데이터 저장하기)
  // 폼 데이터는 사용자가 입력한 정보를 저장하는 객체입니다
  const [formData, setFormData] = useState({
    username: '',                     // 사용자명 (빈 문자열로 시작)
    password: '',                     // 비밀번호 (빈 문자열로 시작)
    rememberMe: false                 // 로그인 상태 유지 (false = 체크 안됨)
  });

  // 사용자 정보를 업데이트하는 함수 (나이를 1살씩 증가시키기)
  // prevUser는 이전 사용자 정보를 의미합니다
  const handleUserUpdate = () => {
    setUser(prevUser => ({
      ...prevUser,                    // 기존 정보를 모두 복사하고
      age: prevUser.age + 1           // 나이만 1살 증가시킵니다
    }));
  };

  // 새 아이템을 추가하는 함수 (장보기 목록에 새 항목 추가하기)
  const addItem = () => {
    // prompt는 사용자에게 입력을 요청하는 팝업창입니다
    const newItem = prompt('새 아이템을 입력하세요:');
    if (newItem) {  // 사용자가 뭔가 입력했다면
      // 기존 아이템들에 새 아이템을 추가합니다
      setItems(prevItems => [...prevItems, newItem]);
    }
  };

  // 아이템을 삭제하는 함수 (장보기 목록에서 항목 제거하기)
  // index는 삭제할 아이템의 위치입니다
  const removeItem = (index) => {
    // filter는 조건에 맞는 아이템만 남기는 함수입니다
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // 폼 입력값을 변경하는 함수 (사용자가 입력할 때마다 실행)
  // field는 어떤 필드인지, value는 새로운 값입니다
  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,                    // 기존 데이터를 모두 복사하고
      [field]: value                  // 특정 필드만 새로운 값으로 변경합니다
    }));
  };

  return (
    <div className="section">
      <h2>📊 useState 훅 예제</h2>
      
      {/* 기본 카운터 */}
      <div className="card">
        <h3>1. 기본 카운터</h3>
        <p>현재 카운트: <strong>{count}</strong></p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>리셋</button>
      </div>

      {/* 객체 state */}
      <div className="card">
        <h3>2. 객체 State 관리</h3>
        <p><strong>이름:</strong> {user.name}</p>
        <p><strong>나이:</strong> {user.age}</p>
        <p><strong>이메일:</strong> {user.email}</p>
        <button onClick={handleUserUpdate}>나이 증가</button>
      </div>

      {/* 배열 state */}
      <div className="card">
        <h3>3. 배열 State 관리</h3>
        <ul style={{ textAlign: 'left', margin: '10px 0' }}>
          {items.map((item, index) => (
            <li key={index}>
              {item} 
              <button 
                onClick={() => removeItem(index)}
                style={{ marginLeft: '10px', fontSize: '12px', padding: '2px 6px' }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <button onClick={addItem}>아이템 추가</button>
      </div>

      {/* 폼 데이터 state */}
      <div className="card">
        <h3>4. 폼 데이터 State 관리</h3>
        <div>
          <input
            type="text"
            placeholder="사용자명"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
            />
            로그인 상태 유지
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <p><strong>현재 입력값:</strong></p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default StateExample;
