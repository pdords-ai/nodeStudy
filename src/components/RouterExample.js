// 필요한 라이브러리를 가져옵니다
import React, { useState } from 'react';  // React와 useState 훅을 가져옵니다

// RouterExample 컴포넌트 (React Router 개념을 학습하는 컴포넌트)
// React Router는 React에서 페이지 간 이동을 관리하는 라이브러리입니다
// 마치 책의 목차를 클릭하면 해당 페이지로 이동하는 것과 같아요
const RouterExample = () => {
  // 현재 페이지 상태 (실제로는 React Router가 관리합니다)
  const [currentPage, setCurrentPage] = useState('home');
  const [history, setHistory] = useState(['home']);  // 페이지 이동 기록
  const [historyIndex, setHistoryIndex] = useState(0);  // 현재 위치

  // 1. 페이지 컴포넌트들 (실제로는 별도 파일로 분리합니다)
  const HomePage = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🏠 홈 페이지</h2>
      <p>React Router 예제에 오신 것을 환영합니다!</p>
      <div style={{ 
        backgroundColor: '#e8f4fd', 
        padding: '15px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>홈 페이지 특징:</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>웹사이트의 메인 페이지입니다</li>
          <li>사용자가 가장 먼저 보는 페이지입니다</li>
          <li>다른 페이지로 이동할 수 있는 링크를 제공합니다</li>
        </ul>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>ℹ️ 소개 페이지</h2>
      <p>이 프로젝트에 대한 자세한 정보를 확인할 수 있습니다.</p>
      <div style={{ 
        backgroundColor: '#f0f8ff', 
        padding: '15px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>프로젝트 정보:</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>프로젝트명:</strong> React 학습 프로젝트</li>
          <li><strong>버전:</strong> 1.0.0</li>
          <li><strong>기술 스택:</strong> React, JavaScript, CSS</li>
          <li><strong>목적:</strong> React 기본 개념 학습</li>
        </ul>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>📞 연락처 페이지</h2>
      <p>문의사항이 있으시면 언제든 연락해주세요!</p>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>연락처 정보:</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>이메일:</strong> contact@example.com</li>
          <li><strong>전화:</strong> 010-1234-5678</li>
          <li><strong>주소:</strong> 서울시 강남구 테헤란로 123</li>
        </ul>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🛍️ 상품 페이지</h2>
      <p>다양한 상품들을 확인해보세요!</p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        margin: '20px 0'
      }}>
        {[
          { name: 'React 책', price: '25,000원', description: 'React 기초부터 고급까지' },
          { name: 'JavaScript 가이드', price: '30,000원', description: '모던 JavaScript 완벽 가이드' },
          { name: 'CSS 마스터', price: '20,000원', description: 'CSS3 완전 정복' },
          { name: 'Node.js 입문', price: '28,000원', description: '서버 사이드 JavaScript' }
        ].map((product, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{product.name}</h4>
            <p style={{ margin: '5px 0', color: '#e74c3c', fontWeight: 'bold' }}>{product.price}</p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const BlogPage = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>📝 블로그 페이지</h2>
      <p>최신 기술 소식과 학습 내용을 공유합니다!</p>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px',
        margin: '20px 0'
      }}>
        {[
          { title: 'React Hooks 완벽 가이드', date: '2024-01-15', views: 1200 },
          { title: 'JavaScript ES6+ 문법 정리', date: '2024-01-10', views: 850 },
          { title: 'CSS Grid와 Flexbox 비교', date: '2024-01-05', views: 650 },
          { title: 'Node.js 서버 구축하기', date: '2024-01-01', views: 420 }
        ].map((post, index) => (
          <div key={index} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#fafafa',
            textAlign: 'left'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{post.title}</h4>
            <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666' }}>
              <span>📅 {post.date}</span>
              <span>👁️ {post.views} 조회</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 2. 페이지 이동 함수들
  const navigateTo = (page) => {
    setCurrentPage(page);
    
    // 히스토리 업데이트 (뒤로가기 기능을 위한 시뮬레이션)
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(page);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPage(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPage(history[newIndex]);
    }
  };

  // 3. 현재 페이지 렌더링
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'products':
        return <ProductsPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return <HomePage />;
    }
  };

  // 4. 네비게이션 메뉴 데이터
  const menuItems = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'about', label: '소개', icon: 'ℹ️' },
    { id: 'products', label: '상품', icon: '🛍️' },
    { id: 'blog', label: '블로그', icon: '📝' },
    { id: 'contact', label: '연락처', icon: '📞' }
  ];

  return (
    <div className="section">
      <h2>🧭 React Router 예제</h2>
      
      {/* 네비게이션 바 */}
      <div className="card">
        <h3>1. 네비게이션 바</h3>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              style={{
                backgroundColor: currentPage === item.id ? '#3498db' : '#ecf0f1',
                color: currentPage === item.id ? 'white' : '#2c3e50',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* 뒤로가기/앞으로가기 버튼 */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            style={{
              backgroundColor: historyIndex === 0 ? '#bdc3c7' : '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: historyIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: '12px'
            }}
          >
            ← 뒤로가기
          </button>
          
          <button
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            style={{
              backgroundColor: historyIndex === history.length - 1 ? '#bdc3c7' : '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: historyIndex === history.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '12px'
            }}
          >
            앞으로가기 →
          </button>
        </div>

        {/* 현재 위치 표시 */}
        <div style={{ 
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          fontSize: '14px',
          color: '#666'
        }}>
          현재 페이지: <strong>{menuItems.find(item => item.id === currentPage)?.label}</strong>
          <br />
          히스토리: {history.map((page, index) => 
            <span key={index} style={{ 
              color: index === historyIndex ? '#3498db' : '#95a5a6',
              fontWeight: index === historyIndex ? 'bold' : 'normal'
            }}>
              {menuItems.find(item => item.id === page)?.label}
              {index < history.length - 1 && ' → '}
            </span>
          )}
        </div>
      </div>

      {/* 페이지 내용 */}
      <div className="card">
        <h3>2. 페이지 내용</h3>
        {renderCurrentPage()}
      </div>

      {/* React Router 개념 설명 */}
      <div className="card">
        <h3>3. React Router 개념</h3>
        <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#fafafa'
          }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>
              🛣️ 라우팅이란?
            </h4>
            <p style={{ marginBottom: '10px', lineHeight: '1.6' }}>
              URL에 따라 다른 컴포넌트를 보여주는 기능입니다. 
              사용자가 브라우저의 주소창에 다른 URL을 입력하거나 링크를 클릭하면 
              해당하는 페이지가 표시됩니다.
            </p>
            <div style={{ 
              backgroundColor: '#2c3e50', 
              color: '#ecf0f1', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              /home → HomePage 컴포넌트<br/>
              /about → AboutPage 컴포넌트<br/>
              /contact → ContactPage 컴포넌트
            </div>
          </div>

          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#fafafa'
          }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>
              🔗 주요 컴포넌트들
            </h4>
            <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
              <li><strong>BrowserRouter:</strong> HTML5 History API를 사용하여 라우팅을 관리</li>
              <li><strong>Routes:</strong> 여러 Route를 감싸는 컨테이너</li>
              <li><strong>Route:</strong> 특정 경로와 컴포넌트를 연결</li>
              <li><strong>Link:</strong> 페이지 이동을 위한 링크 컴포넌트</li>
              <li><strong>useNavigate:</strong> 프로그래밍 방식으로 페이지 이동</li>
            </ul>
          </div>

          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#fafafa'
          }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>
              📝 실제 사용 예제
            </h4>
            <pre style={{ 
              backgroundColor: '#2c3e50', 
              color: '#ecf0f1', 
              padding: '15px', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
{`// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

// Navigation.js
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/about">소개</Link>
      <Link to="/contact">연락처</Link>
    </nav>
  );
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* React Router 학습 팁 */}
      <div className="card">
        <h3>📝 React Router 학습 팁</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li><strong>설치:</strong> npm install react-router-dom으로 설치하세요</li>
          <li><strong>BrowserRouter 사용:</strong> 최상위 컴포넌트를 BrowserRouter로 감싸세요</li>
          <li><strong>Link vs a 태그:</strong> 페이지 이동에는 Link 컴포넌트를 사용하세요</li>
          <li><strong>동적 라우팅:</strong> /user/:id 같은 동적 경로를 활용하세요</li>
          <li><strong>중첩 라우팅:</strong> 복잡한 페이지 구조에는 중첩 라우팅을 사용하세요</li>
          <li><strong>404 페이지:</strong> 존재하지 않는 경로에 대한 처리를 추가하세요</li>
          <li><strong>프로그래밍 네비게이션:</strong> useNavigate 훅을 활용하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default RouterExample;
