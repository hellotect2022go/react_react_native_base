# Expo WebView 프로젝트

이 프로젝트는 두 개의 독립적인 JavaScript 기반 애플리케이션으로 구성되어 있습니다:

1. **expo-app**: Expo 모바일 앱 (WebView 컨테이너)
2. **web-app**: Vite + React 웹 애플리케이션

## 프로젝트 구조

```
.
├── expo-app/          # Expo 모바일 앱
│   ├── App.js         # WebView를 포함한 메인 앱
│   └── package.json
│
└── web-app/           # Vite React 웹 앱
    ├── src/
    │   ├── App.jsx    # 메인 웹 애플리케이션
    │   └── App.css    # 스타일
    └── package.json
```

## 설치 방법

두 프로젝트의 의존성이 이미 설치되어 있습니다. 만약 다시 설치해야 한다면:

```bash
# Expo 앱
cd expo-app
npm install

# Vite 웹 앱
cd web-app
npm install
```

## 실행 방법

### 1단계: 웹 앱 실행

먼저 Vite 개발 서버를 실행합니다:

```bash
cd web-app
npm run dev
```

서버는 `http://localhost:5173`에서 실행됩니다.
네트워크의 다른 장치에서도 접근할 수 있도록 `0.0.0.0`으로 바인딩되어 있습니다.

### 2단계: Expo 앱 실행

새 터미널을 열고 Expo 앱을 실행합니다:

```bash
cd expo-app
npm start
```

그런 다음 원하는 플랫폼을 선택합니다:
- **`a`** - Android 에뮬레이터
- **`i`** - iOS 시뮬레이터 (macOS만 가능)
- **`w`** - 웹 브라우저

또는 Expo Go 앱을 사용하여 실제 기기에서 QR 코드를 스캔할 수 있습니다.

## 개발 환경 설정

### Android 에뮬레이터
- Expo 앱의 `App.js`는 Android 에뮬레이터용으로 `http://10.0.2.2:5173`을 사용합니다
- 이는 Android 에뮬레이터에서 호스트 머신의 localhost에 접근하는 특별한 IP입니다

### iOS 시뮬레이터 또는 실제 기기
- `http://localhost:5173`을 사용합니다
- 실제 기기의 경우, 컴퓨터의 로컬 IP 주소로 변경해야 할 수 있습니다 (예: `http://192.168.1.xxx:5173`)

### 네트워크에서 로컬 IP 확인
Windows:
```bash
ipconfig
```

Mac/Linux:
```bash
ifconfig
```

## 주요 기능

### Expo 앱 (expo-app)
- React Native WebView를 사용하여 웹 앱 표시
- 개발/프로덕션 환경에 따라 URL 자동 전환
- SafeAreaView로 안전한 영역 처리

### Vite 웹 앱 (web-app)
- 카운터 기능
- 할 일 목록 (Todo List)
- 반응형 디자인
- 모던한 UI/UX

## 프로덕션 배포

### 웹 앱 배포
1. 웹 앱을 빌드합니다:
```bash
cd web-app
npm run build
```

2. `dist` 폴더를 호스팅 서비스(Vercel, Netlify, GitHub Pages 등)에 배포합니다.

3. Expo 앱의 `App.js`에서 프로덕션 URL을 업데이트합니다:
```javascript
const webAppUrl = __DEV__ 
  ? '...' 
  : 'https://your-deployed-web-app.com'; // 여기에 배포된 URL 입력
```

### Expo 앱 배포
```bash
cd expo-app
npx eas build --platform android  # Android용
npx eas build --platform ios       # iOS용
```

## 문제 해결

### WebView가 로드되지 않는 경우
1. 웹 앱이 실행 중인지 확인하세요 (`http://localhost:5173` 또는 네트워크 IP)
2. Expo 앱의 URL이 올바른지 확인하세요
3. 방화벽이 포트 5173을 차단하지 않는지 확인하세요

### Android 에뮬레이터에서 연결 실패
- `http://10.0.2.2:5173` 대신 컴퓨터의 로컬 IP를 사용해보세요

### iOS에서 연결 실패
- `http://localhost:5173` 대신 컴퓨터의 로컬 IP를 사용해보세요

## 기술 스택

- **Expo**: React Native 프레임워크
- **React Native WebView**: 네이티브 WebView 컴포넌트
- **Vite**: 빠른 개발 서버와 빌드 도구
- **React**: UI 라이브러리
- **JavaScript**: 프로그래밍 언어 (TypeScript 없이)

## 라이선스

MIT
