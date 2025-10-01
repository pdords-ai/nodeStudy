import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiExample = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  // 1. GET 요청 - 게시글 목록 가져오기
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
      setPosts(response.data);
    } catch (err) {
      setError('게시글을 가져오는데 실패했습니다.');
      console.error('GET 요청 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. GET 요청 - 특정 사용자 정보 가져오기
  const fetchUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUser(response.data);
    } catch (err) {
      setError('사용자 정보를 가져오는데 실패했습니다.');
      console.error('GET 요청 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 3. POST 요청 - 새 게시글 생성
  const createPost = async () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: newPost.title,
        body: newPost.body,
        userId: 1
      });
      
      // 성공적으로 생성된 게시글을 목록에 추가
      setPosts(prevPosts => [response.data, ...prevPosts]);
      setNewPost({ title: '', body: '' });
      alert('게시글이 성공적으로 생성되었습니다!');
    } catch (err) {
      setError('게시글 생성에 실패했습니다.');
      console.error('POST 요청 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 4. PUT 요청 - 게시글 수정
  const updatePost = async (postId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedData);
      
      // 수정된 게시글로 목록 업데이트
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? response.data : post
        )
      );
      alert('게시글이 성공적으로 수정되었습니다!');
    } catch (err) {
      setError('게시글 수정에 실패했습니다.');
      console.error('PUT 요청 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 5. DELETE 요청 - 게시글 삭제
  const deletePost = async (postId) => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      
      // 삭제된 게시글을 목록에서 제거
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      alert('게시글이 성공적으로 삭제되었습니다!');
    } catch (err) {
      setError('게시글 삭제에 실패했습니다.');
      console.error('DELETE 요청 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 게시글 목록 가져오기
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="section">
      <h2>🌐 API 호출 예제</h2>
      
      {/* 로딩 및 에러 상태 */}
      {loading && (
        <div className="loading">
          <p>로딩 중...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {/* 1. GET 요청 - 게시글 목록 */}
      <div className="card">
        <h3>1. GET 요청 - 게시글 목록</h3>
        <button onClick={fetchPosts} disabled={loading}>
          게시글 새로고침
        </button>
        
        <div style={{ marginTop: '15px' }}>
          {posts.length > 0 ? (
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {posts.map(post => (
                <div key={post.id} style={{ 
                  border: '1px solid #eee', 
                  borderRadius: '5px', 
                  padding: '10px', 
                  margin: '5px 0',
                  backgroundColor: '#fafafa'
                }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
                    {post.title}
                  </h4>
                  <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                    {post.body}
                  </p>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button 
                      onClick={() => updatePost(post.id, { 
                        ...post, 
                        title: post.title + ' (수정됨)',
                        body: post.body + '\n\n[이 게시글은 수정되었습니다.]'
                      })}
                      style={{ fontSize: '12px', padding: '2px 6px' }}
                      disabled={loading}
                    >
                      수정
                    </button>
                    <button 
                      onClick={() => deletePost(post.id)}
                      style={{ fontSize: '12px', padding: '2px 6px' }}
                      disabled={loading}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 2. POST 요청 - 새 게시글 생성 */}
      <div className="card">
        <h3>2. POST 요청 - 새 게시글 생성</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="게시글 제목"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <textarea
            placeholder="게시글 내용"
            value={newPost.body}
            onChange={(e) => setNewPost({...newPost, body: e.target.value})}
            rows="3"
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
          />
          <button onClick={createPost} disabled={loading}>
            게시글 생성
          </button>
        </div>
      </div>

      {/* 3. GET 요청 - 특정 사용자 정보 */}
      <div className="card">
        <h3>3. GET 요청 - 특정 사용자 정보</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => fetchUser(1)} disabled={loading}>사용자 1</button>
          <button onClick={() => fetchUser(2)} disabled={loading}>사용자 2</button>
          <button onClick={() => fetchUser(3)} disabled={loading}>사용자 3</button>
          <button onClick={() => setUser(null)}>정보 숨기기</button>
        </div>
        
        {user && (
          <div style={{ 
            marginTop: '15px', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '5px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{user.name}</h4>
            <p style={{ margin: '5px 0' }}><strong>이메일:</strong> {user.email}</p>
            <p style={{ margin: '5px 0' }}><strong>전화번호:</strong> {user.phone}</p>
            <p style={{ margin: '5px 0' }}><strong>웹사이트:</strong> {user.website}</p>
            <p style={{ margin: '5px 0' }}><strong>회사:</strong> {user.company?.name}</p>
            <p style={{ margin: '5px 0' }}><strong>주소:</strong> {user.address?.city}, {user.address?.street}</p>
          </div>
        )}
      </div>

      {/* 4. 에러 처리 및 재시도 */}
      <div className="card">
        <h3>4. 에러 처리 및 재시도</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              setError(null);
              // 의도적으로 잘못된 URL로 요청하여 에러 발생
              axios.get('https://jsonplaceholder.typicode.com/invalid-url')
                .catch(err => setError('의도적으로 발생시킨 에러입니다.'));
            }}
            disabled={loading}
          >
            에러 발생시키기
          </button>
          
          <button 
            onClick={() => {
              setError(null);
              fetchPosts();
            }}
            disabled={loading}
          >
            에러 초기화 및 재시도
          </button>
        </div>
        
        {error && (
          <div className="error" style={{ marginTop: '10px' }}>
            <p><strong>에러:</strong> {error}</p>
            <button 
              onClick={() => setError(null)}
              style={{ marginTop: '5px', fontSize: '12px', padding: '2px 6px' }}
            >
              에러 메시지 닫기
            </button>
          </div>
        )}
      </div>

      {/* 5. 동시 요청 */}
      <div className="card">
        <h3>5. 동시 요청 (Promise.all)</h3>
        <button 
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              // 여러 API를 동시에 호출
              const [postsResponse, usersResponse] = await Promise.all([
                axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
                axios.get('https://jsonplaceholder.typicode.com/users?_limit=3')
              ]);
              
              console.log('게시글:', postsResponse.data);
              console.log('사용자:', usersResponse.data);
              alert('동시 요청 완료! 콘솔을 확인해보세요.');
            } catch (err) {
              setError('동시 요청 중 오류가 발생했습니다.');
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          동시 요청 실행
        </button>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          여러 API를 동시에 호출하여 성능을 향상시킵니다.
        </p>
      </div>

      <div className="card">
        <h3>📝 API 호출 팁</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Axios 사용:</strong> fetch보다 간편하고 기능이 풍부한 HTTP 클라이언트</li>
          <li><strong>에러 처리:</strong> try-catch 블록으로 모든 API 호출을 감싸세요</li>
          <li><strong>로딩 상태:</strong> 사용자 경험을 위해 로딩 상태를 관리하세요</li>
          <li><strong>useEffect 활용:</strong> 컴포넌트 마운트 시 데이터를 가져오세요</li>
          <li><strong>의존성 배열:</strong> useEffect의 의존성 배열을 올바르게 설정하세요</li>
          <li><strong>상태 관리:</strong> API 응답을 적절한 state에 저장하세요</li>
          <li><strong>동시 요청:</strong> Promise.all을 사용하여 여러 API를 동시에 호출하세요</li>
          <li><strong>재시도 로직:</strong> 네트워크 오류 시 재시도 기능을 구현하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiExample;
