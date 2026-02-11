# 🔥 Firebase SMS 인증 채팅 앱

19금 테마의 실시간 채팅 앱 with Firebase SMS 인증

## 🎯 주요 기능

### ✅ 인증 시스템
- **SMS 인증** - 전화번호로 간편 가입
- **Google 연동** - 전화번호와 Google 계정 연동
- **테스트 모드** - Firebase 없이도 개발 가능
- **자동 로그인** - 한 번 로그인하면 유지

### 💬 채팅 앱 기능
1. **홈 (참여자 목록)**
   - 온라인 사용자 프로필 보기
   - 나이/지역/성별 필터링
   - 실시간 검색
   - 대화하기 버튼

2. **채팅 목록**
   - 참여중인 채팅방 목록
   - 안읽은 메시지 표시
   - 최근 메시지 미리보기

3. **일상 피드**
   - 소셜 미디어 스타일 피드
   - 좋아요/댓글 기능
   - 게시글 작성 (모달)

4. **설정**
   - 다크/라이트 테마 전환
   - 프로필 관리
   - 로그아웃

## 🎨 테마

### 🌞 라이트 테마
- 밝은 핑크/로즈 계열
- 부드러운 그라디언트
- 깔끔한 화이트 배경

### 🌙 다크 테마
- 어두운 핑크/보라 계열
- 눈이 편한 다크 배경
- 동일한 액센트 컬러

## 📁 프로젝트 구조

```
web-app/
├── src/
│   ├── config/
│   │   └── firebase.js              # Firebase 설정 (API 키)
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx          # 인증 로직 (SMS, Google)
│   │   └── ThemeContext.jsx         # 테마 관리
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── PhoneAuthPage.jsx    # 📱 전화번호 입력
│   │   │   ├── VerifyCodePage.jsx   # 🔐 코드 확인
│   │   │   └── GoogleAuthPage.jsx   # 🔐 Google 연동
│   │   ├── HomePage.jsx             # 🏠 사용자 목록
│   │   ├── ListPage.jsx             # 💬 채팅방 목록
│   │   ├── List2Page.jsx            # ✨ 일상 피드
│   │   └── SettingsPage.jsx         # ⚙️ 설정
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.styled.js     # 재사용 버튼
│   │   │   ├── Card.styled.js       # 재사용 카드
│   │   │   └── Input.styled.js      # 재사용 입력
│   │   ├── MainLayout.jsx           # 메인 레이아웃
│   │   └── MainLayout.styled.js     # 레이아웃 스타일
│   │
│   ├── services/
│   │   └── api.js                   # 백엔드 API 연동
│   │
│   ├── data/
│   │   └── mockData.js              # 가라 데이터
│   │
│   ├── theme.js                     # 테마 정의
│   ├── GlobalStyles.js              # 전역 스타일
│   ├── App.jsx                      # 메인 앱
│   └── main.jsx                     # 진입점
│
├── FIREBASE_SETUP.md                # Firebase 설정 가이드
└── package.json
```

## 🚀 시작하기

### 1. 개발 서버 실행

```bash
cd web-app
npm install
npm run dev
```

앱이 `http://localhost:5173`에서 실행됩니다.

### 2. 테스트 모드 사용

현재는 **테스트 모드**로 Firebase 없이 동작합니다:

1. **전화번호 입력** - 아무 번호나 입력
2. **인증 코드** - 아무 6자리 숫자 입력 (예: 123456)
3. **또는 "인증 건너뛰기"** 버튼 클릭

### 3. Firebase 설정 (나중에)

실제 SMS 인증을 사용하려면:

1. `FIREBASE_SETUP.md` 파일 참고
2. Firebase 프로젝트 생성
3. API 키 발급
4. `src/config/firebase.js` 수정
5. 코드의 TODO 주석 해제

## 📱 인증 흐름

```
1. 앱 시작
   ↓
2. 로그인 상태 확인
   ↓
   로그인 ❌ → 전화번호 입력 페이지
   ↓
3. SMS 인증 코드 전송
   ↓
4. 코드 입력 및 확인
   ↓
5. [선택] Google 계정 연동
   ↓
6. 메인 앱 화면
   ↓
   - 홈 (사용자 목록)
   - 채팅 목록
   - 일상 피드
   - 설정
```

## 🔧 환경 변수

`.env` 파일 생성:

```bash
# Firebase 설정 (나중에)
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id

# 백엔드 API (나중에)
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_WS_URL=ws://localhost:3000/ws
```

## 📚 API 문서

### AuthContext

```javascript
const {
  user,              // 현재 로그인 사용자
  loading,           // 로딩 상태
  phoneNumber,       // 입력한 전화번호
  sendSMSCode,       // SMS 코드 전송
  verifySMSCode,     // SMS 코드 확인
  signInWithGoogle,  // Google 로그인
  logout,            // 로그아웃
  skipAuth,          // 테스트: 인증 건너뛰기
} = useAuth();
```

### 백엔드 API (예정)

```javascript
// 사용자
GET    /api/users                    - 사용자 목록
GET    /api/users/:id                - 사용자 정보
PUT    /api/users/:id                - 프로필 수정

// 채팅
GET    /api/chats/rooms              - 채팅방 목록
POST   /api/chats/rooms              - 채팅방 생성
GET    /api/chats/rooms/:id/messages - 메시지 목록
POST   /api/chats/rooms/:id/messages - 메시지 전송

// 피드
GET    /api/feeds                    - 피드 목록
POST   /api/feeds                    - 피드 작성
POST   /api/feeds/:id/like           - 좋아요
POST   /api/feeds/:id/unlike         - 좋아요 취소

// 실시간
WS     /ws                           - WebSocket 연결
```

## 🎨 스타일 가이드

### 컬러 팔레트

**라이트 테마:**
```javascript
background: '#FFF5F7'
primary: '#FF4081'
accent: '#E91E63'
```

**다크 테마:**
```javascript
background: '#1A0612'
primary: '#FF4081'
accent: '#E91E63'
```

### 재사용 컴포넌트

```javascript
import { Button, IconButton } from './components/common/Button.styled';
import { Card, Avatar, Badge } from './components/common/Card.styled';
import { Input, SearchInput, Select } from './components/common/Input.styled';
```

## 🧪 테스트

### 인증 테스트

1. **전화번호 인증**
   ```
   전화번호: 01012345678
   코드: 123456 (아무거나)
   ```

2. **인증 건너뛰기**
   - 첫 화면에서 버튼 클릭

3. **로그아웃**
   - 설정 > 로그아웃

### 기능 테스트

- 사용자 필터링 (나이/지역/성별)
- 검색 기능
- 피드 좋아요
- 테마 전환 (다크/라이트)

## 📦 의존성

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-icons": "^5.5.0",
  "styled-components": "^6.3.9",
  "firebase": "^10.x" (나중에 설치)
}
```

## 🔥 Firebase 무료 플랜

```
✅ SMS 인증: 월 10,000건 무료
✅ Authentication: 무제한
✅ Realtime Database: 1GB
✅ Hosting: 10GB/월

💵 초과 시: 건당 약 8원
```

## 📝 다음 단계

### 단기 (1주일)
- [ ] Firebase 프로젝트 생성
- [ ] SMS 인증 실제 테스트
- [ ] Google 로그인 테스트
- [ ] 프로필 정보 입력 페이지

### 중기 (1개월)
- [ ] 백엔드 API 개발 (/z/dhhan/00.project/06.chatapp)
- [ ] 실시간 채팅 구현 (WebSocket)
- [ ] 이미지 업로드 기능
- [ ] 알림 시스템

### 장기 (3개월)
- [ ] 결제 시스템
- [ ] 관리자 페이지
- [ ] 신고/차단 기능
- [ ] 앱 스토어 배포

## 🆘 문제 해결

### Firebase 초기화 실패
```javascript
// src/config/firebase.js에서 API 키 확인
// Firebase Console에서 웹 앱 추가 확인
```

### SMS 전송 실패
```javascript
// Firebase Console > Authentication > Phone 활성화 확인
// 전화번호 형식 확인: +821012345678
```

### 테스트 모드에서 벗어나기
```javascript
// src/contexts/AuthContext.jsx의 TODO 주석 제거
// Firebase 패키지 설치: npm install firebase
```

## 📞 지원

문제가 있으면:
1. `FIREBASE_SETUP.md` 참고
2. Firebase Console 로그 확인
3. 브라우저 개발자 도구 Console 확인

---

**Made with 💕 by Your Team**

현재 버전: v1.0.0 (테스트 모드)
