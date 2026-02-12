# Expo WebView 앱

이 앱은 React Native WebView를 사용하여 Vite 웹 앱을 모바일 앱 내에서 표시합니다.

## 실행 방법

```bash
npm start
```

그런 다음:
- `a` - Android 에뮬레이터
- `i` - iOS 시뮬레이터
- `w` - 웹 브라우저

## 주요 기능

- React Native WebView로 웹 앱 임베딩
- 개발/프로덕션 환경 자동 전환
- 안전 영역 처리
- 플랫폼별 URL 설정 (Android 에뮬레이터 지원)

## 설정

`App.js`에서 WebView URL을 수정할 수 있습니다:

```javascript
const webAppUrl = __DEV__ 
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:5173'     // Android 에뮬레이터
    : 'http://localhost:5173'     // iOS 또는 실제 기기
  : 'https://your-deployed-url';  // 프로덕션
```

## 의존성

- expo
- react
- react-native
- react-native-webview

## 빌드

```bash
npx eas build --platform android
npx eas build --platform ios
```
