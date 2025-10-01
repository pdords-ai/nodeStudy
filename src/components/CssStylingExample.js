import React, { useState } from 'react';
import './CssStylingExample.css';

const CssStylingExample = () => {
  const [activeTab, setActiveTab] = useState('inline');
  const [theme, setTheme] = useState('default');

  return (
    <div className="section">
      <h2>🎨 CSS 스타일링 예제</h2>
      
      {/* 테마 선택 */}
      <div className="card">
        <h3>테마 선택</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            className={`theme-btn ${theme === 'default' ? 'active' : ''}`}
            onClick={() => setTheme('default')}
          >
            기본 테마
          </button>
          <button 
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            다크 테마
          </button>
          <button 
            className={`theme-btn ${theme === 'colorful' ? 'active' : ''}`}
            onClick={() => setTheme('colorful')}
          >
            컬러풀 테마
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="card">
        <h3>스타일링 방법별 예제</h3>
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'inline' ? 'active' : ''}`}
            onClick={() => setActiveTab('inline')}
          >
            인라인 스타일
          </button>
          <button 
            className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            CSS 클래스
          </button>
          <button 
            className={`tab-btn ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
          >
            CSS 모듈
          </button>
          <button 
            className={`tab-btn ${activeTab === 'styled' ? 'active' : ''}`}
            onClick={() => setActiveTab('styled')}
          >
            Styled Components
          </button>
        </div>

        {/* 인라인 스타일 예제 */}
        {activeTab === 'inline' && (
          <div className="tab-content">
            <h4>1. 인라인 스타일</h4>
            <p>직접 style 속성에 객체로 스타일을 적용하는 방법입니다.</p>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              border: '2px solid #007bff',
              borderRadius: '10px',
              margin: '10px 0',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}>
              <h5 style={{ 
                color: '#007bff', 
                marginBottom: '10px',
                fontSize: '18px'
              }}>
                인라인 스타일 예제
              </h5>
              <p style={{ 
                color: '#6c757d', 
                lineHeight: '1.6',
                margin: '0'
              }}>
                이 박스는 인라인 스타일로 스타일링되었습니다.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                성공 버튼
              </button>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                위험 버튼
              </button>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#ffc107',
                color: '#212529',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                경고 버튼
              </button>
            </div>
          </div>
        )}

        {/* CSS 클래스 예제 */}
        {activeTab === 'css' && (
          <div className="tab-content">
            <h4>2. CSS 클래스</h4>
            <p>별도의 CSS 파일에서 클래스를 정의하고 className 속성으로 적용하는 방법입니다.</p>
            
            <div className="styled-card">
              <h5 className="card-title">CSS 클래스 예제</h5>
              <p className="card-text">
                이 박스는 CSS 클래스로 스타일링되었습니다.
              </p>
            </div>

            <div className="button-group">
              <button className="btn btn-primary">Primary 버튼</button>
              <button className="btn btn-secondary">Secondary 버튼</button>
              <button className="btn btn-success">Success 버튼</button>
              <button className="btn btn-danger">Danger 버튼</button>
            </div>

            <div className="grid-example">
              <div className="grid-item">그리드 아이템 1</div>
              <div className="grid-item">그리드 아이템 2</div>
              <div className="grid-item">그리드 아이템 3</div>
              <div className="grid-item">그리드 아이템 4</div>
            </div>
          </div>
        )}

        {/* CSS 모듈 예제 */}
        {activeTab === 'modules' && (
          <div className="tab-content">
            <h4>3. CSS 모듈</h4>
            <p>CSS 파일을 모듈로 import하여 컴포넌트별로 스코프가 격리된 스타일을 적용하는 방법입니다.</p>
            
            <div className={styles.moduleCard}>
              <h5 className={styles.moduleTitle}>CSS 모듈 예제</h5>
              <p className={styles.moduleText}>
                이 박스는 CSS 모듈로 스타일링되었습니다.
              </p>
            </div>

            <div className={styles.moduleButtonGroup}>
              <button className={styles.moduleBtn + ' ' + styles.primary}>Primary</button>
              <button className={styles.moduleBtn + ' ' + styles.secondary}>Secondary</button>
              <button className={styles.moduleBtn + ' ' + styles.success}>Success</button>
            </div>

            <div className={styles.moduleFlexbox}>
              <div className={styles.flexItem}>Flex 아이템 1</div>
              <div className={styles.flexItem}>Flex 아이템 2</div>
              <div className={styles.flexItem}>Flex 아이템 3</div>
            </div>
          </div>
        )}

        {/* Styled Components 예제 */}
        {activeTab === 'styled' && (
          <div className="tab-content">
            <h4>4. Styled Components</h4>
            <p>JavaScript로 CSS-in-JS를 구현하는 방법입니다. (설치 필요: npm install styled-components)</p>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              border: '2px solid #6f42c1',
              borderRadius: '10px',
              margin: '10px 0'
            }}>
              <h5 style={{ color: '#6f42c1', marginBottom: '10px' }}>
                Styled Components 예제 (시뮬레이션)
              </h5>
              <p style={{ color: '#6c757d', margin: '0' }}>
                실제로는 styled-components 라이브러리를 사용하여 다음과 같이 구현합니다:
              </p>
              <pre style={{ 
                backgroundColor: '#f1f3f4', 
                padding: '15px', 
                borderRadius: '5px', 
                marginTop: '10px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`import styled from 'styled-components';

const StyledButton = styled.button\`
  padding: 10px 20px;
  background-color: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    opacity: 0.8;
  }
\`;

// 사용법
<StyledButton primary>Primary 버튼</StyledButton>`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 애니메이션 예제 */}
      <div className="card">
        <h3>CSS 애니메이션 예제</h3>
        
        <div className="animation-container">
          <div className="animated-box bounce">Bounce</div>
          <div className="animated-box rotate">Rotate</div>
          <div className="animated-box pulse">Pulse</div>
          <div className="animated-box slide">Slide</div>
        </div>

        <div className="hover-effects">
          <h4>호버 효과</h4>
          <div className="hover-container">
            <button className="hover-btn scale">Scale</button>
            <button className="hover-btn glow">Glow</button>
            <button className="hover-btn slide-up">Slide Up</button>
            <button className="hover-btn color-change">Color Change</button>
          </div>
        </div>
      </div>

      {/* 반응형 디자인 예제 */}
      <div className="card">
        <h3>반응형 디자인 예제</h3>
        <p>화면 크기에 따라 레이아웃이 변경되는 예제입니다.</p>
        
        <div className="responsive-grid">
          <div className="responsive-item">아이템 1</div>
          <div className="responsive-item">아이템 2</div>
          <div className="responsive-item">아이템 3</div>
          <div className="responsive-item">아이템 4</div>
          <div className="responsive-item">아이템 5</div>
          <div className="responsive-item">아이템 6</div>
        </div>
      </div>

      <div className="card">
        <h3>📝 CSS 스타일링 가이드</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>방법</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>장점</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>단점</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>사용 시기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>인라인 스타일</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>동적 스타일, 간단함</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>재사용성 낮음, 우선순위 문제</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>동적 값, 프로토타이핑</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>CSS 클래스</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>재사용성, 유지보수성</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>전역 스코프, 이름 충돌</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>일반적인 스타일링</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>CSS 모듈</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>스코프 격리, 타입 안전성</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>설정 복잡, 동적 스타일 제한</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>컴포넌트별 스타일</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Styled Components</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>동적 스타일, 테마 지원</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>번들 크기, 런타임 오버헤드</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>복잡한 동적 스타일</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// CSS 모듈 스타일 (실제로는 별도 파일에서 import)
const styles = {
  moduleCard: 'module-card',
  moduleTitle: 'module-title',
  moduleText: 'module-text',
  moduleButtonGroup: 'module-button-group',
  moduleBtn: 'module-btn',
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  moduleFlexbox: 'module-flexbox',
  flexItem: 'flex-item'
};

export default CssStylingExample;
