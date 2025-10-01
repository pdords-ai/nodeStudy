// 필요한 라이브러리를 가져옵니다
import React, { useState, useEffect, useCallback, useRef } from 'react';  // React와 여러 훅들을 가져옵니다

// CustomHooksExample 컴포넌트 (커스텀 훅을 학습하는 컴포넌트)
// 커스텀 훅은 로직을 재사용할 수 있게 해주는 함수입니다
// 마치 요리 레시피를 만들어서 여러 번 사용하는 것과 같아요
const CustomHooksExample = () => {
  // 1. useCounter 커스텀 훅 (카운터 로직을 재사용)
  const useCounter = (initialValue = 0, step = 1) => {
    const [count, setCount] = useState(initialValue);
    
    const increment = useCallback(() => {
      setCount(prev => prev + step);
    }, [step]);
    
    const decrement = useCallback(() => {
      setCount(prev => prev - step);
    }, [step]);
    
    const reset = useCallback(() => {
      setCount(initialValue);
    }, [initialValue]);
    
    return { count, increment, decrement, reset };
  };

  // 2. useLocalStorage 커스텀 훅 (로컬 스토리지 관리)
  const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error('로컬 스토리지 읽기 실패:', error);
        return initialValue;
      }
    });

    const setValue = useCallback((value) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('로컬 스토리지 저장 실패:', error);
      }
    }, [key]);

    return [storedValue, setValue];
  };

  // 3. useFetch 커스텀 훅 (API 호출 관리)
  const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 실제 API 대신 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          message: 'API 호출 성공!',
          timestamp: new Date().toLocaleString(),
          data: {
            users: Math.floor(Math.random() * 1000),
            posts: Math.floor(Math.random() * 5000),
            comments: Math.floor(Math.random() * 10000)
          }
        };
        
        setData(mockData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, [url]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
  };

  // 4. useDebounce 커스텀 훅 (디바운스 기능)
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  // 5. useToggle 커스텀 훅 (토글 기능)
  const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    
    const toggle = useCallback(() => {
      setValue(prev => !prev);
    }, []);
    
    const setTrue = useCallback(() => {
      setValue(true);
    }, []);
    
    const setFalse = useCallback(() => {
      setValue(false);
    }, []);
    
    return [value, { toggle, setTrue, setFalse }];
  };

  // 6. useClickOutside 커스텀 훅 (외부 클릭 감지)
  const useClickOutside = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  };

  // 7. usePrevious 커스텀 훅 (이전 값 저장)
  const usePrevious = (value) => {
    const ref = useRef();
    
    useEffect(() => {
      ref.current = value;
    });
    
    return ref.current;
  };

  // 8. useWindowSize 커스텀 훅 (윈도우 크기 감지)
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  };

  // 컴포넌트에서 커스텀 훅들 사용
  const counter1 = useCounter(0, 1);
  const counter2 = useCounter(10, 5);
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const { data, loading, error, refetch } = useFetch('/api/data');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isVisible, { toggle, setTrue, setFalse }] = useToggle(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const previousCount = usePrevious(counter1.count);
  const windowSize = useWindowSize();

  // 외부 클릭 시 드롭다운 닫기
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div className="section">
      <h2>🎣 Custom Hooks 예제</h2>
      
      {/* useCounter 예제 */}
      <div className="card">
        <h3>1. useCounter 커스텀 훅</h3>
        <p>카운터 로직을 재사용할 수 있는 커스텀 훅입니다.</p>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#fafafa',
            minWidth: '200px'
          }}>
            <h4>카운터 1 (1씩 증가)</h4>
            <p>현재 값: <strong>{counter1.count}</strong></p>
            <p>이전 값: <strong>{previousCount}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={counter1.increment}>+1</button>
              <button onClick={counter1.decrement}>-1</button>
              <button onClick={counter1.reset}>리셋</button>
            </div>
          </div>
          
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#fafafa',
            minWidth: '200px'
          }}>
            <h4>카운터 2 (5씩 증가)</h4>
            <p>현재 값: <strong>{counter2.count}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={counter2.increment}>+5</button>
              <button onClick={counter2.decrement}>-5</button>
              <button onClick={counter2.reset}>리셋</button>
            </div>
          </div>
        </div>
      </div>

      {/* useLocalStorage 예제 */}
      <div className="card">
        <h3>2. useLocalStorage 커스텀 훅</h3>
        <p>로컬 스토리지를 쉽게 관리할 수 있는 커스텀 훅입니다.</p>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#fafafa',
            minWidth: '200px'
          }}>
            <h4>사용자 이름</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <p>저장된 이름: <strong>{name || '없음'}</strong></p>
          </div>
          
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#fafafa',
            minWidth: '200px'
          }}>
            <h4>테마 설정</h4>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              <option value="light">라이트 테마</option>
              <option value="dark">다크 테마</option>
              <option value="colorful">컬러풀 테마</option>
            </select>
            <p>현재 테마: <strong>{theme}</strong></p>
          </div>
        </div>
      </div>

      {/* useFetch 예제 */}
      <div className="card">
        <h3>3. useFetch 커스텀 훅</h3>
        <p>API 호출을 쉽게 관리할 수 있는 커스텀 훅입니다.</p>
        
        <div style={{ marginTop: '15px' }}>
          <button onClick={refetch} disabled={loading} style={{ marginBottom: '15px' }}>
            {loading ? '로딩 중...' : '데이터 새로고침'}
          </button>
          
          {loading && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#e8f4fd', 
              borderRadius: '5px',
              marginBottom: '15px'
            }}>
              데이터를 가져오는 중...
            </div>
          )}
          
          {error && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8d7da', 
              color: '#721c24',
              borderRadius: '5px',
              marginBottom: '15px'
            }}>
              에러: {error}
            </div>
          )}
          
          {data && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#d4edda', 
              borderRadius: '5px'
            }}>
              <h4>받은 데이터:</h4>
              <pre style={{ 
                backgroundColor: '#2c3e50', 
                color: '#ecf0f1', 
                padding: '10px', 
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* useDebounce 예제 */}
      <div className="card">
        <h3>4. useDebounce 커스텀 훅</h3>
        <p>입력이 완료된 후에만 실행되는 디바운스 기능입니다.</p>
        
        <div style={{ marginTop: '15px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요..."
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <p>실시간 입력: <strong>{searchTerm}</strong></p>
          <p>디바운스된 값: <strong>{debouncedSearchTerm}</strong></p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            💡 500ms 동안 입력이 없을 때만 디바운스된 값이 업데이트됩니다.
          </p>
        </div>
      </div>

      {/* useToggle 예제 */}
      <div className="card">
        <h3>5. useToggle 커스텀 훅</h3>
        <p>토글 기능을 쉽게 관리할 수 있는 커스텀 훅입니다.</p>
        
        <div style={{ marginTop: '15px' }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: isVisible ? '#d4edda' : '#f8d7da',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            <p>상태: <strong>{isVisible ? '보임' : '숨김'}</strong></p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={toggle}>토글</button>
            <button onClick={setTrue}>보이기</button>
            <button onClick={setFalse}>숨기기</button>
          </div>
        </div>
      </div>

      {/* useClickOutside 예제 */}
      <div className="card">
        <h3>6. useClickOutside 커스텀 훅</h3>
        <p>요소 외부를 클릭했을 때를 감지하는 커스텀 훅입니다.</p>
        
        <div style={{ marginTop: '15px' }}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            드롭다운 {isDropdownOpen ? '닫기' : '열기'}
          </button>
          
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: 'relative',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '5px',
                padding: '10px',
                marginTop: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <p>이 드롭다운은 외부를 클릭하면 닫힙니다!</p>
              <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                <li>메뉴 항목 1</li>
                <li>메뉴 항목 2</li>
                <li>메뉴 항목 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* useWindowSize 예제 */}
      <div className="card">
        <h3>7. useWindowSize 커스텀 훅</h3>
        <p>윈도우 크기를 실시간으로 감지하는 커스텀 훅입니다.</p>
        
        <div style={{ marginTop: '15px' }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#e8f4fd', 
            borderRadius: '5px'
          }}>
            <p>현재 윈도우 크기:</p>
            <p>너비: <strong>{windowSize.width}px</strong></p>
            <p>높이: <strong>{windowSize.height}px</strong></p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              💡 브라우저 창 크기를 조절해보세요!
            </p>
          </div>
        </div>
      </div>

      {/* 커스텀 훅 코드 예제 */}
      <div className="card">
        <h3>8. 커스텀 훅 코드 예제</h3>
        <div style={{ marginTop: '15px' }}>
          <pre style={{ 
            backgroundColor: '#2c3e50', 
            color: '#ecf0f1', 
            padding: '15px', 
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
{`// useCounter 커스텀 훅
const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
};

// 사용법
const MyComponent = () => {
  const { count, increment, decrement, reset } = useCounter(0, 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      {/* 커스텀 훅 학습 팁 */}
      <div className="card">
        <h3>📝 커스텀 훅 학습 팁</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>이름 규칙:</strong> 커스텀 훅은 반드시 'use'로 시작해야 합니다</li>
          <li><strong>로직 분리:</strong> 재사용 가능한 로직을 커스텀 훅으로 분리하세요</li>
          <li><strong>단일 책임:</strong> 하나의 커스텀 훅은 하나의 기능만 담당하도록 하세요</li>
          <li><strong>의존성 최적화:</strong> useCallback, useMemo를 적절히 사용하여 성능을 최적화하세요</li>
          <li><strong>에러 처리:</strong> 커스텀 훅 내에서 적절한 에러 처리를 구현하세요</li>
          <li><strong>타입 안전성:</strong> TypeScript를 사용한다면 적절한 타입을 정의하세요</li>
          <li><strong>테스트:</strong> 커스텀 훅도 테스트할 수 있도록 설계하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomHooksExample;
