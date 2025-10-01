import React, { useState } from 'react';

const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    interests: [],
    country: '',
    bio: '',
    agreeTerms: false,
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'interests') {
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(interest => interest !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 최소 2글자 이상이어야 합니다.';
    }

    // 이메일 검증
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6글자 이상이어야 합니다.';
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 나이 검증
    if (!formData.age) {
      newErrors.age = '나이를 입력해주세요.';
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = '올바른 나이를 입력해주세요.';
    }

    // 성별 검증
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.';
    }

    // 관심사 검증
    if (formData.interests.length === 0) {
      newErrors.interests = '최소 하나의 관심사를 선택해주세요.';
    }

    // 약관 동의 검증
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '약관에 동의해야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // 폼 제출 시뮬레이션
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmittedData(formData);
      console.log('폼 데이터:', formData);
    } catch (error) {
      console.error('제출 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
      interests: [],
      country: '',
      bio: '',
      agreeTerms: false,
      newsletter: false
    });
    setErrors({});
    setSubmittedData(null);
  };

  const interests = ['프로그래밍', '디자인', '음악', '영화', '독서', '운동', '여행', '요리'];

  if (submittedData) {
    return (
      <div className="section">
        <h2>📝 폼 처리 예제</h2>
        <div className="success">
          <h3>🎉 폼이 성공적으로 제출되었습니다!</h3>
          <h4>제출된 데이터:</h4>
          <pre style={{ textAlign: 'left', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          <button onClick={resetForm}>새 폼 작성</button>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>📝 폼 처리 예제</h2>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 기본 텍스트 입력 */}
        <div className="card">
          <h3>1. 기본 입력 필드</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              이름 *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: errors.name ? '2px solid #e74c3c' : '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="이름을 입력하세요"
            />
            {errors.name && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              이메일 *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: errors.email ? '2px solid #e74c3c' : '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="이메일을 입력하세요"
            />
            {errors.email && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              비밀번호 *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: errors.password ? '2px solid #e74c3c' : '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="비밀번호를 입력하세요"
            />
            {errors.password && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.password}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              비밀번호 확인 *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: errors.confirmPassword ? '2px solid #e74c3c' : '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.confirmPassword && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* 숫자 입력 및 선택 */}
        <div className="card">
          <h3>2. 숫자 입력 및 선택</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              나이 *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: errors.age ? '2px solid #e74c3c' : '1px solid #ddd',
                borderRadius: '4px'
              }}
              placeholder="나이를 입력하세요"
              min="1"
              max="120"
            />
            {errors.age && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.age}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              성별 *
            </label>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                남성
              </label>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                여성
              </label>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                />
                기타
              </label>
            </div>
            {errors.gender && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.gender}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              국가
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">국가를 선택하세요</option>
              <option value="korea">대한민국</option>
              <option value="usa">미국</option>
              <option value="japan">일본</option>
              <option value="china">중국</option>
              <option value="uk">영국</option>
            </select>
          </div>
        </div>

        {/* 체크박스 */}
        <div className="card">
          <h3>3. 체크박스</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              관심사 * (최소 1개 선택)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              {interests.map(interest => (
                <label key={interest} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleInputChange}
                    style={{ marginRight: '5px' }}
                  />
                  {interest}
                </label>
              ))}
            </div>
            {errors.interests && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.interests}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                style={{ marginRight: '5px' }}
              />
              이용약관에 동의합니다 *
            </label>
            {errors.agreeTerms && <p style={{ color: '#e74c3c', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.agreeTerms}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                style={{ marginRight: '5px' }}
              />
              뉴스레터 구독 (선택사항)
            </label>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="card">
          <h3>4. 텍스트 영역</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              자기소개
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                resize: 'vertical'
              }}
              placeholder="자신에 대해 간단히 소개해주세요..."
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="card">
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                padding: '12px 30px', 
                fontSize: '16px',
                backgroundColor: isSubmitting ? '#bdc3c7' : '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? '제출 중...' : '제출하기'}
            </button>
            
            <button 
              type="button" 
              onClick={resetForm}
              style={{ 
                padding: '12px 30px', 
                fontSize: '16px',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              초기화
            </button>
          </div>
        </div>
      </form>

      <div className="card">
        <h3>📝 폼 처리 팁</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>제어 컴포넌트:</strong> input의 value를 state로 관리하여 완전한 제어</li>
          <li><strong>유효성 검사:</strong> 실시간 또는 제출 시 유효성 검사 구현</li>
          <li><strong>에러 처리:</strong> 사용자 친화적인 에러 메시지 표시</li>
          <li><strong>폼 초기화:</strong> 제출 후 또는 필요시 폼 데이터 초기화</li>
          <li><strong>비동기 제출:</strong> 로딩 상태 관리 및 사용자 피드백</li>
          <li><strong>접근성:</strong> label과 input 연결, 적절한 input 타입 사용</li>
        </ul>
      </div>
    </div>
  );
};

export default FormExample;
