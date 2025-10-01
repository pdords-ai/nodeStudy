// 필요한 라이브러리를 가져옵니다
import React from 'react';  // React 라이브러리를 가져옵니다

// 1. 기본 Props 컴포넌트 (사용자 카드)
// Props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다
// 마치 편지를 봉투에 넣어서 보내는 것과 같아요
const UserCard = ({ name, age, email, avatar }) => {
  return (
    <div className="card">
      {/* 사용자 프로필 사진 */}
      <img 
        src={avatar || 'https://via.placeholder.com/100'}  // avatar가 없으면 기본 이미지 사용
        alt={`${name}의 아바타`}                           // 이미지 설명 (시각 장애인을 위한 텍스트)
        style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
      />
      <h3>{name}</h3>                    {/* 사용자 이름 */}
      <p><strong>나이:</strong> {age}세</p>  {/* 사용자 나이 */}
      <p><strong>이메일:</strong> {email}</p> {/* 사용자 이메일 */}
    </div>
  );
};

// 2. 기본값이 있는 Props 컴포넌트 (재사용 가능한 버튼)
// 이 컴포넌트는 다양한 스타일의 버튼을 만들 수 있습니다
const Button = ({ 
  children,                    // 버튼 안에 들어갈 내용 (텍스트나 다른 요소들)
  variant = 'primary',        // 버튼 스타일 (기본값: primary)
  size = 'medium',            // 버튼 크기 (기본값: medium)
  onClick,                    // 클릭했을 때 실행할 함수
  disabled = false            // 비활성화 여부 (기본값: false)
}) => {
  // 버튼의 스타일을 동적으로 결정합니다
  const buttonStyle = {
    padding: size === 'large' ? '15px 30px' : size === 'small' ? '5px 15px' : '10px 20px',
    backgroundColor: variant === 'primary' ? '#3498db' : 
                     variant === 'secondary' ? '#95a5a6' : 
                     variant === 'danger' ? '#e74c3c' : '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',  // 비활성화되면 금지 커서
    opacity: disabled ? 0.6 : 1,                   // 비활성화되면 투명하게
    fontSize: size === 'large' ? '16px' : size === 'small' ? '12px' : '14px'
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}  {/* 버튼 안에 들어갈 내용을 표시합니다 */}
    </button>
  );
};

// 3. 객체 Props 컴포넌트
const ProductCard = ({ product }) => {
  const { name, price, description, inStock, category } = product;
  
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>카테고리:</strong> {category}</p>
      <p><strong>가격:</strong> {price.toLocaleString()}원</p>
      <p><strong>설명:</strong> {description}</p>
      <p><strong>재고:</strong> 
        <span style={{ color: inStock ? '#27ae60' : '#e74c3c' }}>
          {inStock ? ' 있음' : ' 없음'}
        </span>
      </p>
    </div>
  );
};

// 4. 함수 Props 컴포넌트
const Counter = ({ initialCount = 0, onCountChange }) => {
  const [count, setCount] = React.useState(initialCount);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onCountChange) {
      onCountChange(newCount);
    }
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    if (onCountChange) {
      onCountChange(newCount);
    }
  };

  return (
    <div className="card">
      <h3>카운터: {count}</h3>
      <Button onClick={handleIncrement} size="small">+</Button>
      <Button onClick={handleDecrement} size="small">-</Button>
    </div>
  );
};

// 5. children Props 컴포넌트
const Card = ({ title, children }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '20px', 
      margin: '10px',
      backgroundColor: '#fafafa'
    }}>
      {title && <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>{title}</h3>}
      {children}
    </div>
  );
};

const PropsExample = () => {
  const [totalCount, setTotalCount] = React.useState(0);

  const handleCountChange = (newCount) => {
    setTotalCount(newCount);
  };

  const sampleProducts = [
    {
      name: '아이폰 15',
      price: 1200000,
      description: '최신 애플 스마트폰',
      inStock: true,
      category: '스마트폰'
    },
    {
      name: '갤럭시 S24',
      price: 1100000,
      description: '삼성의 최신 플래그십',
      inStock: false,
      category: '스마트폰'
    }
  ];

  return (
    <div className="section">
      <h2>📦 Props 전달 예제</h2>
      
      <div className="card">
        <h3>1. 기본 Props 전달</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <UserCard 
            name="김철수" 
            age={28} 
            email="kim@example.com"
            avatar="https://via.placeholder.com/100/3498db/ffffff?text=김"
          />
          <UserCard 
            name="이영희" 
            age={32} 
            email="lee@example.com"
            avatar="https://via.placeholder.com/100/e74c3c/ffffff?text=이"
          />
          <UserCard 
            name="박민수" 
            age={25} 
            email="park@example.com"
          />
        </div>
      </div>

      <div className="card">
        <h3>2. 기본값이 있는 Props</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button>기본 버튼</Button>
          <Button variant="secondary">보조 버튼</Button>
          <Button variant="danger" size="large">위험 버튼</Button>
          <Button size="small">작은 버튼</Button>
          <Button disabled>비활성 버튼</Button>
        </div>
      </div>

      <div className="card">
        <h3>3. 객체 Props</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {sampleProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>

      <div className="card">
        <h3>4. 함수 Props (콜백)</h3>
        <p>전체 카운트: <strong>{totalCount}</strong></p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Counter initialCount={0} onCountChange={handleCountChange} />
          <Counter initialCount={10} onCountChange={handleCountChange} />
        </div>
      </div>

      <div className="card">
        <h3>5. children Props</h3>
        <Card title="일반 카드">
          <p>이것은 children props를 사용한 카드입니다.</p>
          <Button variant="primary">카드 내부 버튼</Button>
        </Card>
        
        <Card>
          <h4>제목 없는 카드</h4>
          <p>children만 있는 카드입니다.</p>
          <ul>
            <li>리스트 아이템 1</li>
            <li>리스트 아이템 2</li>
            <li>리스트 아이템 3</li>
          </ul>
        </Card>
      </div>

      <div className="card">
        <h3>📝 Props 사용 팁</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Props는 읽기 전용:</strong> 자식 컴포넌트에서 props를 직접 수정하면 안 됩니다</li>
          <li><strong>기본값 설정:</strong> defaultProps나 기본 매개변수를 사용하세요</li>
          <li><strong>PropTypes:</strong> 개발 시 타입 체크를 위해 PropTypes를 사용하세요</li>
          <li><strong>구조 분해 할당:</strong> props를 구조 분해하여 코드를 깔끔하게 만드세요</li>
          <li><strong>children props:</strong> 컴포넌트 내부에 다른 요소를 포함시킬 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
};

export default PropsExample;
