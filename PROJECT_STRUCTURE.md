# 📁 프로젝트 구조

```
d:\HDD\09.test\
│
├── 📱 expo-app/                    # Expo 모바일 앱 프로젝트
│   ├── App.js                      # 메인 앱 - WebView 포함
│   ├── app.json                    # Expo 설정
│   ├── babel.config.js             # Babel 설정
│   ├── package.json                # 의존성 및 스크립트
│   └── README.md                   # Expo 앱 문서
│
├── 🌐 web-app/                     # Vite + React 웹 앱 프로젝트
│   ├── src/
│   │   ├── App.jsx                 # 메인 React 컴포넌트
│   │   ├── App.css                 # 스타일
│   │   ├── main.jsx                # 엔트리 포인트
│   │   └── assets/                 # 이미지 등
│   ├── public/                     # 정적 파일
│   ├── index.html                  # HTML 템플릿
│   ├── vite.config.js              # Vite 설정
│   ├── package.json                # 의존성 및 스크립트
│   └── README.md                   # 웹 앱 문서
│
├── 📄 README.md                    # 프로젝트 전체 문서
├── 📄 QUICK_START.md               # 빠른 시작 가이드
├── 📄 PROJECT_STRUCTURE.md         # 이 파일
├── 🚀 start.bat                    # Windows 시작 스크립트
└── 🚀 start.sh                     # Linux/Mac 시작 스크립트
```

## 🔄 데이터 흐름

```
┌─────────────────────────────────────────┐
│         Expo 모바일 앱                    │
│  ┌───────────────────────────────────┐  │
│  │     React Native WebView          │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐ │  │
│  │  │   Vite + React 웹 앱        │ │  │
│  │  │                             │ │  │
│  │  │  • 카운터                    │ │  │
│  │  │  • 할 일 목록                │ │  │
│  │  │  • 기타 웹 기능              │ │  │
│  │  └─────────────────────────────┘ │  │
│  │                                   │  │
│  │  URL: http://localhost:5173      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Platform: iOS / Android / Web          │
└─────────────────────────────────────────┘
```

## 🎯 각 파일의 역할

### Expo 앱 (expo-app/)

#### `App.js`
- 앱의 진입점
- WebView 컴포넌트 설정
- 개발/프로덕션 URL 관리
- 플랫폼별 URL 처리 (Android/iOS)

#### `app.json`
- Expo 앱 설정
- 앱 이름, 아이콘, 스플래시 화면 등
- 플랫폼별 설정

#### `package.json`
```json
{
  "scripts": {
    "start": "expo start",      // 개발 서버 시작
    "android": "...",            // Android 실행
    "ios": "...",                // iOS 실행
    "web": "..."                 // 웹 실행
  },
  "dependencies": {
    "expo": "~54.0.33",
    "react-native-webview": "13.15.0"
  }
}
```

### 웹 앱 (web-app/)

#### `src/App.jsx`
- 메인 React 컴포넌트
- 카운터 로직
- 할 일 목록 로직
- UI 렌더링

#### `src/App.css`
- 모든 스타일
- 반응형 디자인
- 애니메이션 효과

#### `vite.config.js`
```javascript
{
  server: {
    host: true,        // 네트워크 접근 허용
    port: 5173,        // 포트 번호
    strictPort: true   // 포트 고정
  }
}
```

#### `package.json`
```json
{
  "scripts": {
    "dev": "vite",           // 개발 서버
    "build": "vite build",   // 프로덕션 빌드
    "preview": "..."         // 빌드 미리보기
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
```

## 🔧 설정 파일

### Expo 설정
- `app.json` - 앱 메타데이터
- `babel.config.js` - JavaScript 변환

### Vite 설정
- `vite.config.js` - 개발 서버 및 빌드 설정
- `index.html` - HTML 템플릿

## 📦 의존성

### Expo 앱
```
react-native          # 네이티브 컴포넌트
expo                  # Expo 프레임워크
react-native-webview  # WebView 컴포넌트
```

### 웹 앱
```
react       # UI 라이브러리
react-dom   # DOM 렌더링
vite        # 빌드 도구
```

## 🚀 실행 순서

1. **웹 앱 시작** (포트 5173)
2. **Expo 앱 시작** (WebView가 웹 앱 로드)
3. **개발 진행**
   - 웹 앱 수정 → 자동 새로고침
   - Expo 앱 수정 → 자동 리로드

## 🌍 네트워크 설정

### 개발 환경
- **Localhost**: `http://localhost:5173`
- **Android 에뮬레이터**: `http://10.0.2.2:5173`
- **iOS 시뮬레이터**: `http://localhost:5173`
- **실제 기기**: `http://[컴퓨터-IP]:5173`

### 프로덕션
- 웹 앱을 빌드하여 호스팅
- Expo 앱에서 배포된 URL 사용
