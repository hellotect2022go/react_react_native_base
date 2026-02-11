// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/api/v1';

/**
 * 공통 API 요청 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} options - fetch 옵션
 * @returns {Promise<Object>} - API 응답 데이터
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 인증 토큰이 있으면 추가
  const token = localStorage.getItem('authToken');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log('🌐 API 호출:', url, options.method || 'GET');

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log('📡 API 응답 상태:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ API 에러:', errorData);
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ API 응답:', data);
    return data;
  } catch (error) {
    console.error('❌ API Request Failed:', error);
    
    return {
      success: false,
      message: error.message,
    };
  }
}

// ==================== 사용자 관련 API ====================

/**
 * 사용자 프로필 생성 (첫 가입 시)
 * @param {string} userId - 사용자 ID
 * @param {Object} profileData - 프로필 데이터
 * @returns {Promise<Object>} - 생성된 사용자 정보
 */
/**
 * 사용자 프로필 생성 (첫 가입 시)
 * @param {Object} profileData - 프로필 데이터 (uid, nickname, age, gender, region, bio, avatar, profileImage 포함)
 * @returns {Promise<Object>} - 생성된 사용자 정보
 */
export async function createUserProfile(profileData) {
  //console.log('createUserProfile - profileData:', JSON.stringify(profileData));
  
  // JSON으로 전송
  return apiRequest(`/users/profile`, {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
}

/**
 * 사용자 프로필 가져오기
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Object>} - 사용자 정보
 */
export async function getUserProfile(userId) {
  // TODO: 백엔드 API 연동
  // return apiRequest(`/users/${userId}`);
  
  // 테스트 데이터
  return {
    uid: userId,
    nickname: '테스트 유저',
    age: 25,
    gender: 'male',
    region: '서울',
    bio: '안녕하세요!',
    avatar: '😊',
  };
}

/**
 * 사용자 프로필 업데이트
 * @param {string} userId - 사용자 ID
 * @param {Object} profileData - 업데이트할 프로필 데이터
 * @returns {Promise<Object>} - 업데이트된 사용자 정보
 */
export async function updateUserProfile(userId, profileData) {
  // TODO: 백엔드 API 연동
  // return apiRequest(`/users/${userId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(profileData),
  // });
  
  console.log('프로필 업데이트:', profileData);
  return { success: true };
}

/**
 * 이미지 업로드
 * @param {File} file - 이미지 파일
 * @param {string} userId - 사용자 ID
 * @returns {Promise<string>} - 업로드된 이미지 URL
 */
export async function uploadImage(file, userId) {
  console.log('📸 이미지 업로드 시작:', file.name);
  
  try {
    // 백엔드 API 연동 시도
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ 서버 업로드 성공:', data);
      return data.url || data.imageUrl;
    }
  } catch (error) {
    console.error('❌ API Request Failed:', error);
  }
}

/**
 * 사용자 목록 가져오기 (필터링)
 * @param {Object} filters - 필터 옵션 { age, region, gender }
 * @returns {Promise<Array>} - 사용자 목록
 */
export async function getUsers(filters = {}) {
  // 백엔드 API 연동
  const queryString = new URLSearchParams(filters).toString();
  return apiRequest(`/users?${queryString}`);
}

// ==================== 채팅 관련 API ====================

/**
 * 채팅방 목록 가져오기
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Array>} - 채팅방 목록
 */
export async function getChatRooms(userId) {
  // TODO: 백엔드 API 연동
  // return apiRequest(`/chats/rooms?userId=${userId}`);
  
  // mockData 반환 (임시)
  const { mockChatRooms } = await import('../data/mockData');
  return mockChatRooms;
}

/**
 * 채팅방 생성
 * @param {string} userId1 - 사용자 1 ID
 * @param {string} userId2 - 사용자 2 ID
 * @returns {Promise<Object>} - 생성된 채팅방 정보
 */
export async function createChatRoom(userId1, userId2) {
  // TODO: 백엔드 API 연동
  // return apiRequest('/chats/rooms', {
  //   method: 'POST',
  //   body: JSON.stringify({ userId1, userId2 }),
  // });
  
  console.log('채팅방 생성:', userId1, userId2);
  return {
    id: Date.now(),
    members: [userId1, userId2],
  };
}

/**
 * 채팅 메시지 전송
 * @param {string} roomId - 채팅방 ID
 * @param {string} message - 메시지 내용
 * @returns {Promise<Object>} - 전송된 메시지 정보
 */
export async function sendMessage(roomId, message) {
  // TODO: 백엔드 API 연동
  // return apiRequest(`/chats/rooms/${roomId}/messages`, {
  //   method: 'POST',
  //   body: JSON.stringify({ message }),
  // });
  
  console.log('메시지 전송:', roomId, message);
  return {
    id: Date.now(),
    roomId,
    message,
    timestamp: new Date(),
  };
}

/**
 * 채팅 메시지 가져오기
 * @param {string} roomId - 채팅방 ID
 * @returns {Promise<Array>} - 메시지 목록
 */
export async function getMessages(roomId) {
  // TODO: 백엔드 API 연동
  // return apiRequest(`/chats/rooms/${roomId}/messages`);
  
  console.log('메시지 조회:', roomId);
  return [];
}

// ==================== 피드 관련 API ====================

/**
 * 피드 목록 가져오기
 * @returns {Promise<Array>} - 피드 목록
 */
export async function getFeeds() {
  // TODO: 백엔드 API 연동
  // return apiRequest('/feeds');
  
  // mockData 반환 (임시)
  const { mockFeeds } = await import('../data/mockData');
  return mockFeeds;
}

/**
 * 피드 작성
 * @param {Object} feedData - 피드 데이터
 * @returns {Promise<Object>} - 작성된 피드 정보
 */
export async function createFeed(feedData) {
  // TODO: 백엔드 API 연동
  // return apiRequest('/feeds', {
  //   method: 'POST',
  //   body: JSON.stringify(feedData),
  // });
  
  console.log('피드 작성:', feedData);
  return {
    id: Date.now(),
    ...feedData,
    timestamp: new Date(),
  };
}

/**
 * 피드 좋아요
 * @param {string} feedId - 피드 ID
 * @returns {Promise<Object>} - 좋아요 결과
 */
export async function likeFeed(feedId) {
  // TODO: 백엔드 API 연동
  // return apiRequest(`/feeds/${feedId}/like`, {
  //   method: 'POST',
  // });
  
  console.log('피드 좋아요:', feedId);
  return { success: true };
}

/**
 * 피드 댓글 작성
 * @param {string} feedId - 피드 ID
 * @param {string} comment - 댓글 내용
 * @returns {Promise<Object>} - 작성된 댓글 정보
 */
export async function commentFeed(feedId, comment) {
  // TODO: 백엔드 API 연동
  // return apiRequest(`/feeds/${feedId}/comments`, {
  //   method: 'POST',
  //   body: JSON.stringify({ comment }),
  // });
  
  console.log('댓글 작성:', feedId, comment);
  return {
    id: Date.now(),
    feedId,
    comment,
    timestamp: new Date(),
  };
}
