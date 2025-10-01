import React, { useState } from 'react';

const ListRendering = () => {
  const [items, setItems] = useState([
    { id: 1, name: '사과', price: 1500, category: '과일' },
    { id: 2, name: '바나나', price: 2000, category: '과일' },
    { id: 3, name: '우유', price: 3000, category: '유제품' },
    { id: 4, name: '빵', price: 2500, category: '베이커리' },
    { id: 5, name: '계란', price: 4000, category: '육류/달걀' }
  ]);

  const [newItem, setNewItem] = useState({ name: '', price: '', category: '' });
  const [filter, setFilter] = useState('전체');
  const [sortBy, setSortBy] = useState('name');

  // 새 아이템 추가
  const addItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item = {
        id: Math.max(...items.map(i => i.id)) + 1,
        name: newItem.name,
        price: parseInt(newItem.price),
        category: newItem.category
      };
      setItems([...items, item]);
      setNewItem({ name: '', price: '', category: '' });
    }
  };

  // 아이템 삭제
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // 아이템 수정
  const updateItem = (id, updatedData) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  // 필터링된 아이템들
  const filteredItems = filter === '전체' 
    ? items 
    : items.filter(item => item.category === filter);

  // 정렬된 아이템들
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // 고유한 카테고리 목록
  const categories = ['전체', ...new Set(items.map(item => item.category))];

  return (
    <div className="section">
      <h2>📋 리스트 렌더링 예제</h2>
      
      {/* 1. 기본 리스트 렌더링 */}
      <div className="card">
        <h3>1. 기본 리스트 렌더링</h3>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong> - {item.price.toLocaleString()}원 ({item.category})
              <button 
                onClick={() => deleteItem(item.id)}
                style={{ marginLeft: '10px', fontSize: '12px', padding: '2px 6px' }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. 테이블 형태 리스트 */}
      <div className="card">
        <h3>2. 테이블 형태 리스트</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>이름</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>가격</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>카테고리</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>액션</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map(item => (
              <tr key={item.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.price.toLocaleString()}원</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.category}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    style={{ fontSize: '12px', padding: '2px 6px' }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. 카드 형태 리스트 */}
      <div className="card">
        <h3>3. 카드 형태 리스트</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginTop: '10px' }}>
          {sortedItems.map(item => (
            <div key={item.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px',
              backgroundColor: '#fafafa',
              transition: 'transform 0.2s'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{item.name}</h4>
              <p style={{ margin: '5px 0', fontSize: '18px', color: '#27ae60', fontWeight: 'bold' }}>
                {item.price.toLocaleString()}원
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                {item.category}
              </p>
              <button 
                onClick={() => deleteItem(item.id)}
                style={{ 
                  marginTop: '10px', 
                  fontSize: '12px', 
                  padding: '5px 10px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 필터링 및 정렬 */}
      <div className="card">
        <h3>4. 필터링 및 정렬</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '10px' }}>
            카테고리 필터:
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginLeft: '5px' }}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          
          <label style={{ marginLeft: '20px' }}>
            정렬 기준:
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ marginLeft: '5px' }}
            >
              <option value="name">이름순</option>
              <option value="price">가격순</option>
              <option value="category">카테고리순</option>
            </select>
          </label>
        </div>
        
        <p>총 {sortedItems.length}개의 아이템이 표시됩니다.</p>
      </div>

      {/* 5. 새 아이템 추가 */}
      <div className="card">
        <h3>5. 새 아이템 추가</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="아이템 이름"
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          />
          <input
            type="number"
            placeholder="가격"
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
          />
          <input
            type="text"
            placeholder="카테고리"
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
          />
          <button onClick={addItem}>아이템 추가</button>
        </div>
      </div>

      {/* 6. 인라인 편집 */}
      <div className="card">
        <h3>6. 인라인 편집 (고급 예제)</h3>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {items.map(item => (
            <EditableItem 
              key={item.id} 
              item={item} 
              onUpdate={(updatedData) => updateItem(item.id, updatedData)}
              onDelete={() => deleteItem(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="card">
        <h3>📝 리스트 렌더링 팁</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>key prop 필수:</strong> 각 리스트 아이템에 고유한 key를 제공해야 합니다</li>
          <li><strong>key는 안정적이어야 함:</strong> 배열 인덱스보다는 고유한 ID를 사용하세요</li>
          <li><strong>가상화:</strong> 많은 아이템을 렌더링할 때는 react-window 등을 고려하세요</li>
          <li><strong>필터링과 정렬:</strong> 원본 배열을 변경하지 말고 새 배열을 생성하세요</li>
          <li><strong>성능 최적화:</strong> React.memo나 useMemo를 활용하여 불필요한 리렌더링을 방지하세요</li>
        </ul>
      </div>
    </div>
  );
};

// 인라인 편집 컴포넌트
const EditableItem = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...item });

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...item });
    setIsEditing(false);
  };

  return (
    <div style={{ 
      border: '1px solid #eee', 
      borderRadius: '4px', 
      padding: '10px', 
      margin: '5px 0',
      backgroundColor: '#fafafa'
    }}>
      {isEditing ? (
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})}
            style={{ width: '100px' }}
          />
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({...editData, price: parseInt(e.target.value)})}
            style={{ width: '80px' }}
          />
          <input
            type="text"
            value={editData.category}
            onChange={(e) => setEditData({...editData, category: e.target.value})}
            style={{ width: '100px' }}
          />
          <button onClick={handleSave} style={{ fontSize: '12px', padding: '2px 6px' }}>
            저장
          </button>
          <button onClick={handleCancel} style={{ fontSize: '12px', padding: '2px 6px' }}>
            취소
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            <strong>{item.name}</strong> - {item.price.toLocaleString()}원 ({item.category})
          </span>
          <div>
            <button 
              onClick={() => setIsEditing(true)}
              style={{ marginRight: '5px', fontSize: '12px', padding: '2px 6px' }}
            >
              편집
            </button>
            <button 
              onClick={onDelete}
              style={{ fontSize: '12px', padding: '2px 6px' }}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListRendering;
