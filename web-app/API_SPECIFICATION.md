# 🔌 백엔드 API 명세서

## 📡 Base URL
```
http://localhost:3000/api
```

## 🔐 인증
모든 인증이 필요한 API는 헤더에 토큰을 포함해야 합니다:
```
Authorization: Bearer <token>
```

---

## 👤 사용자 프로필 API

### 1. 프로필 생성 (회원가입)

**POST** `/users/:userId/profile`

#### Request Body
```json
{
  "nickname": "달콤한밤🌙",
  "age": 25,
  "gender": "여성",
  "region": "서울",
  "bio": "밤에만 활동하는 올빼미입니다 ✨",
  "avatar": "🦋",
  "profileImage": "https://example.com/image.jpg"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "user": {
    "uid": "user_abc123_xyz789",
    "nickname": "달콤한밤🌙",
    "age": 25,
    "gender": "여성",
    "region": "서울",
    "bio": "밤에만 활동하는 올빼미입니다 ✨",
    "avatar": "🦋",
    "profileImage": "https://example.com/image.jpg",
    "createdAt": "2026-02-10T12:00:00.000Z"
  }
}
```

#### Response (400 Bad Request)
```json
{
  "success": false,
  "error": "닉네임은 필수입니다"
}
```

---

### 2. 프로필 조회

**GET** `/users/:userId`

#### Response (200 OK)
```json
{
  "uid": "user_abc123_xyz789",
  "nickname": "달콤한밤🌙",
  "age": 25,
  "gender": "여성",
  "region": "서울",
  "bio": "밤에만 활동하는 올빼미입니다 ✨",
  "avatar": "🦋",
  "profileImage": "https://example.com/image.jpg",
  "createdAt": "2026-02-10T12:00:00.000Z",
  "updatedAt": "2026-02-10T12:00:00.000Z"
}
```

---

### 3. 프로필 수정

**PUT** `/users/:userId`

#### Request Body
```json
{
  "nickname": "새로운닉네임",
  "bio": "새로운 자기소개"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "user": {
    "uid": "user_abc123_xyz789",
    "nickname": "새로운닉네임",
    "bio": "새로운 자기소개",
    "updatedAt": "2026-02-10T13:00:00.000Z"
  }
}
```

---

### 4. 사용자 목록 조회 (필터링)

**GET** `/users?age=20s&region=서울&gender=여성`

#### Query Parameters
- `age` (optional): `20s`, `30s`
- `region` (optional): `서울`, `부산`, `대구`, etc.
- `gender` (optional): `남성`, `여성`
- `page` (optional, default: 1)
- `limit` (optional, default: 20)

#### Response (200 OK)
```json
{
  "users": [
    {
      "uid": "user_abc123",
      "nickname": "달콤한밤🌙",
      "age": 25,
      "gender": "여성",
      "region": "서울",
      "bio": "밤에만 활동하는 올빼미입니다 ✨",
      "avatar": "🦋",
      "profileImage": "https://example.com/image.jpg",
      "online": true,
      "lastSeen": "방금 전"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasMore": true
  }
}
```

---

## 📸 이미지 업로드 API

### 이미지 업로드

**POST** `/upload/image`

#### Request (multipart/form-data)
```
image: <File>
userId: "user_abc123_xyz789"
```

#### Response (200 OK)
```json
{
  "success": true,
  "imageUrl": "https://cdn.example.com/images/user_abc123_xyz789_1234567890.jpg"
}
```

#### 제약사항
- 최대 파일 크기: 5MB
- 지원 포맷: JPG, PNG, GIF, WEBP
- 이미지는 자동으로 리사이즈 (최대 800x800)

---

## 💬 채팅 API

### 1. 채팅방 목록

**GET** `/chats/rooms?userId=user_abc123`

#### Response (200 OK)
```json
{
  "rooms": [
    {
      "roomId": "room_xyz789",
      "name": "달콤한밤🌙",
      "avatar": "🦋",
      "lastMessage": "내일 시간 되세요?",
      "lastTime": "방금 전",
      "unreadCount": 3,
      "online": true
    }
  ]
}
```

---

### 2. 채팅방 생성

**POST** `/chats/rooms`

#### Request Body
```json
{
  "userId1": "user_abc123",
  "userId2": "user_def456"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "roomId": "room_xyz789",
  "users": ["user_abc123", "user_def456"],
  "createdAt": "2026-02-10T12:00:00.000Z"
}
```

---

### 3. 메시지 목록

**GET** `/chats/rooms/:roomId/messages?page=1&limit=50`

#### Response (200 OK)
```json
{
  "messages": [
    {
      "id": "msg_123",
      "sender": "user_abc123",
      "message": "안녕하세요!",
      "timestamp": "2026-02-10T12:00:00.000Z",
      "read": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "hasMore": false
  }
}
```

---

### 4. 메시지 전송

**POST** `/chats/rooms/:roomId/messages`

#### Request Body
```json
{
  "userId": "user_abc123",
  "message": "안녕하세요!"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": {
    "id": "msg_123",
    "sender": "user_abc123",
    "message": "안녕하세요!",
    "timestamp": "2026-02-10T12:00:00.000Z"
  }
}
```

---

## 📝 피드 API

### 1. 피드 목록

**GET** `/feeds?page=1&limit=20`

#### Response (200 OK)
```json
{
  "feeds": [
    {
      "id": "feed_123",
      "author": {
        "uid": "user_abc123",
        "nickname": "달콤한밤🌙",
        "avatar": "🦋"
      },
      "content": "오늘 정말 좋은 날이네요 ✨",
      "images": ["https://cdn.example.com/feed1.jpg"],
      "likes": 24,
      "comments": 8,
      "isLiked": false,
      "createdAt": "2026-02-10T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

---

### 2. 피드 작성

**POST** `/feeds`

#### Request Body
```json
{
  "userId": "user_abc123",
  "content": "오늘 정말 좋은 날이네요 ✨",
  "images": ["https://cdn.example.com/feed1.jpg"]
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "feed": {
    "id": "feed_123",
    "userId": "user_abc123",
    "content": "오늘 정말 좋은 날이네요 ✨",
    "images": ["https://cdn.example.com/feed1.jpg"],
    "likes": 0,
    "comments": 0,
    "createdAt": "2026-02-10T12:00:00.000Z"
  }
}
```

---

### 3. 좋아요

**POST** `/feeds/:feedId/like`

#### Request Body
```json
{
  "userId": "user_abc123"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "likes": 25
}
```

---

### 4. 좋아요 취소

**POST** `/feeds/:feedId/unlike`

#### Request Body
```json
{
  "userId": "user_abc123"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "likes": 24
}
```

---

## 🌐 WebSocket (실시간 채팅)

### 연결

```javascript
const ws = new WebSocket('ws://localhost:3000/ws?userId=user_abc123');

ws.onopen = () => {
  console.log('WebSocket 연결됨');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('새 메시지:', data);
};
```

### 메시지 전송

```javascript
ws.send(JSON.stringify({
  type: 'message',
  roomId: 'room_xyz789',
  message: '안녕하세요!'
}));
```

### 수신 메시지 형식

```json
{
  "type": "message",
  "roomId": "room_xyz789",
  "sender": "user_def456",
  "message": "안녕하세요!",
  "timestamp": "2026-02-10T12:00:00.000Z"
}
```

---

## 🗄️ 데이터베이스 스키마

### users 테이블
```sql
CREATE TABLE users (
  uid VARCHAR(255) PRIMARY KEY,
  nickname VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  region VARCHAR(50) NOT NULL,
  bio TEXT NOT NULL,
  avatar VARCHAR(10),
  profile_image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_region ON users(region);
CREATE INDEX idx_gender ON users(gender);
CREATE INDEX idx_age ON users(age);
```

### chat_rooms 테이블
```sql
CREATE TABLE chat_rooms (
  room_id VARCHAR(255) PRIMARY KEY,
  user1_id VARCHAR(255) NOT NULL,
  user2_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user1_id) REFERENCES users(uid),
  FOREIGN KEY (user2_id) REFERENCES users(uid)
);
```

### messages 테이블
```sql
CREATE TABLE messages (
  id VARCHAR(255) PRIMARY KEY,
  room_id VARCHAR(255) NOT NULL,
  sender_id VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (room_id) REFERENCES chat_rooms(room_id),
  FOREIGN KEY (sender_id) REFERENCES users(uid)
);

CREATE INDEX idx_room ON messages(room_id);
```

### feeds 테이블
```sql
CREATE TABLE feeds (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  images JSON,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(uid)
);
```

### feed_likes 테이블
```sql
CREATE TABLE feed_likes (
  feed_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (feed_id, user_id),
  FOREIGN KEY (feed_id) REFERENCES feeds(id),
  FOREIGN KEY (user_id) REFERENCES users(uid)
);
```

---

## 🚀 백엔드 구현 예시 (Node.js + Express)

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 프로필 생성
app.post('/api/users/:userId/profile', async (req, res) => {
  const { userId } = req.params;
  const profileData = req.body;
  
  try {
    // DB에 저장
    await db.query(`
      INSERT INTO users (uid, nickname, age, gender, region, bio, avatar, profile_image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      userId,
      profileData.nickname,
      profileData.age,
      profileData.gender,
      profileData.region,
      profileData.bio,
      profileData.avatar,
      profileData.profileImage
    ]);
    
    res.json({
      success: true,
      user: {
        uid: userId,
        ...profileData,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('프로필 생성 실패:', error);
    res.status(500).json({
      success: false,
      error: '프로필 생성에 실패했습니다'
    });
  }
});

// 이미지 업로드
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload/image', upload.single('image'), async (req, res) => {
  const file = req.file;
  const userId = req.body.userId;
  
  try {
    // 이미지 처리 및 CDN 업로드
    const imageUrl = await uploadToCDN(file, userId);
    
    res.json({
      success: true,
      imageUrl
    });
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    res.status(500).json({
      success: false,
      error: '이미지 업로드에 실패했습니다'
    });
  }
});

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다');
});
```

---

## 📝 환경 변수 (.env)

```bash
# 프론트엔드
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_WS_URL=ws://localhost:3000/ws

# 백엔드
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/chatapp
JWT_SECRET=your-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
```

---

## 🧪 테스트 방법

### cURL로 API 테스트

```bash
# 프로필 생성
curl -X POST http://localhost:3000/api/users/user_test123/profile \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "테스트유저",
    "age": 25,
    "gender": "여성",
    "region": "서울",
    "bio": "안녕하세요!",
    "avatar": "👤"
  }'

# 사용자 목록 조회
curl http://localhost:3000/api/users?region=서울&gender=여성
```

---

현재 프론트엔드 코드는 이 API 명세에 맞춰 구현되어 있습니다! 🎉
백엔드만 구현하면 바로 연동 가능합니다.
