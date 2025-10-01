// 필요한 라이브러리를 가져옵니다
import React, { useState, useEffect } from 'react';  // React, useState, useEffect 훅을 가져옵니다

// EffectExample 컴포넌트 (useEffect 훅을 학습하는 컴포넌트)
// useEffect는 컴포넌트가 렌더링될 때 특별한 작업을 수행하는 도구입니다
// 마치 자동차의 자동문이 문이 열릴 때마다 작동하는 것과 같아요
const EffectExample = () => {
  // 여러 가지 state들을 선언합니다
  const [count, setCount] = useState(0);                    // 카운터 숫자
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 브라우저 창 너비
  const [data, setData] = useState(null);                   // API에서 가져온 데이터
  const [loading, setLoading] = useState(false);            // 로딩 상태
  const [timer, setTimer] = useState(0);                    // 타이머 숫자

  // 1. 기본 useEffect (컴포넌트가 렌더링될 때마다 실행)
  // 의존성 배열이 없으면 매번 실행됩니다
  useEffect(() => {
    console.log('컴포넌트가 렌더링되었습니다!');
  });

  // 2. 의존성 배열이 없는 useEffect (컴포넌트가 처음 나타날 때 한 번만 실행)
  // [] 빈 배열은 "한 번만 실행해주세요"라는 뜻입니다
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다! (한 번만 실행)');
    
    // 클린업 함수 (컴포넌트가 사라질 때 실행되는 정리 함수)
    // 마치 방을 떠날 때 불을 끄고 문을 닫는 것과 같아요
    return () => {
      console.log('컴포넌트가 언마운트됩니다!');
    };
  }, []);

  // 3. 의존성 배열이 있는 useEffect (count가 변경될 때만 실행)
  // [count]는 "count가 바뀔 때만 실행해주세요"라는 뜻입니다
  useEffect(() => {
    // 브라우저 탭의 제목을 변경합니다
    document.title = `카운트: ${count}`;
  }, [count]);

  // 4. 윈도우 크기 감지 (브라우저 창 크기가 바뀔 때마다 실행)
  useEffect(() => {
    // 윈도우 크기가 바뀔 때 실행되는 함수
    const handleResize = () => {
      setWindowWidth(window.innerWidth);  // 새로운 창 너비를 저장합니다
    };

    // 브라우저에 "크기가 바뀌면 이 함수를 실행해주세요"라고 등록합니다
    window.addEventListener('resize', handleResize);

    // 클린업: 이벤트 리스너 제거 (메모리 누수 방지)
    // 마치 전화를 끊을 때 수화기를 내려놓는 것과 같아요
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 5. 타이머 예제 (1초마다 숫자가 증가하는 타이머)
  useEffect(() => {
    // setInterval은 일정한 시간마다 함수를 실행하는 도구입니다
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);  // 타이머를 1씩 증가시킵니다
    }, 1000);  // 1000밀리초 = 1초마다 실행

    // 클린업: 타이머 정리 (메모리 누수 방지)
    return () => {
      clearInterval(interval);  // 타이머를 정리합니다
    };
  }, []);

  // 6. API 호출 시뮬레이션
  const fetchData = async () => {
    setLoading(true);
    try {
      // 실제 API 대신 setTimeout으로 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData({
        id: 1,
        title: 'API 데이터',
        content: '성공적으로 데이터를 가져왔습니다!',
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 7. 데이터가 변경될 때마다 로그 출력
  useEffect(() => {
    if (data) {
      console.log('새로운 데이터:', data);
    }
  }, [data]);

  return (
    <div className="section">
      <h2>⚡ useEffect 훅 예제</h2>
      
      <div className="card">
        <h3>1. 기본 카운터 (document.title 업데이트)</h3>
        <p>현재 카운트: <strong>{count}</strong></p>
        <p>브라우저 탭 제목을 확인해보세요!</p>
        <button onClick={() => setCount(count + 1)}>카운트 증가</button>
        <button onClick={() => setCount(0)}>리셋</button>
      </div>

      <div className="card">
        <h3>2. 윈도우 크기 감지</h3>
        <p>현재 윈도우 너비: <strong>{windowWidth}px</strong></p>
        <p>브라우저 창 크기를 조절해보세요!</p>
      </div>

      <div className="card">
        <h3>3. 타이머 (자동 카운터)</h3>
        <p>경과 시간: <strong>{timer}초</strong></p>
        <p>페이지를 떠나면 타이머가 자동으로 정리됩니다.</p>
      </div>

      <div className="card">
        <h3>4. API 호출 시뮬레이션</h3>
        <button onClick={fetchData} disabled={loading}>
          {loading ? '로딩 중...' : '데이터 가져오기'}
        </button>
        
        {loading && <p className="loading">데이터를 가져오는 중...</p>}
        
        {data && (
          <div className="success" style={{ marginTop: '10px' }}>
            <h4>받은 데이터:</h4>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>제목:</strong> {data.title}</p>
            <p><strong>내용:</strong> {data.content}</p>
            <p><strong>시간:</strong> {data.timestamp}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h3>📝 useEffect 사용 팁</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>의존성 배열 []:</strong> 컴포넌트 마운트 시 한 번만 실행</li>
          <li><strong>의존성 배열 없음:</strong> 매 렌더링마다 실행</li>
          <li><strong>[count]:</strong> count가 변경될 때만 실행</li>
          <li><strong>클린업 함수:</strong> 메모리 누수 방지를 위해 정리 작업 수행</li>
          <li><strong>브라우저 개발자 도구 콘솔을 확인해보세요!</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default EffectExample;
