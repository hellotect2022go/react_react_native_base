# 🚀 빠른 시작 가이드

## 1️⃣ 웹 앱 실행

첫 번째 터미널에서:

```bash
cd web-app
npm run dev
```

✅ 웹 앱이 http://localhost:5173 에서 실행됩니다.
✅ 브라우저에서 직접 확인 가능합니다.

---

## 2️⃣ Expo 앱 실행

두 번째 터미널에서:

```bash
cd expo-app
npm start
```

그런 다음 키보드로 선택:
- **`a`** - Android 에뮬레이터 실행
- **`i`** - iOS 시뮬레이터 실행 (macOS만)
- **`w`** - 웹 브라우저에서 실행

또는 **QR 코드 스캔**으로 실제 기기에서 실행:
- Expo Go 앱 설치 필요 (App Store/Play Store)

---

## 🎯 확인 사항

### 웹 앱이 잘 실행되나요?
브라우저에서 http://localhost:5173 접속:
- Vite + React 로고가 보이나요?
- 카운터 버튼을 클릭하면 숫자가 증가하나요?
- 할 일을 추가할 수 있나요?

### Expo 앱에서 WebView가 보이나요?
- Expo 앱을 실행하면 웹 앱 내용이 표시되나요?
- 카운터와 할 일 목록이 정상 작동하나요?

---

## ⚠️ 문제 해결

### "WebView가 비어있어요!"
1. 웹 앱이 실행 중인지 확인 (첫 번째 터미널)
2. 에러 메시지가 있는지 확인

### Android 에뮬레이터에서 연결 안 됨
`App.js`의 URL을 컴퓨터의 IP로 변경:

Windows에서 IP 확인:
```bash
ipconfig
```

예: `http://192.168.1.123:5173`

### iOS 시뮬레이터에서 연결 안 됨
`localhost` 대신 컴퓨터의 로컬 IP 사용

---

## 📱 실제 기기에서 테스트

1. 컴퓨터와 모바일이 **같은 Wi-Fi** 연결
2. 컴퓨터의 IP 주소 확인
3. `expo-app/App.js`에서 URL 수정:
   ```javascript
   const webAppUrl = 'http://[컴퓨터-IP]:5173'
   ```
4. 방화벽에서 포트 5173 허용

---

## 🎨 커스터마이징

### 웹 앱 수정
- `web-app/src/App.jsx` - 기능 추가
- `web-app/src/App.css` - 스타일 변경

### Expo 앱 수정
- `expo-app/App.js` - WebView 설정 변경

---

## 🏗️ 프로덕션 빌드

### 웹 앱 빌드
```bash
cd web-app
npm run build
```

### Expo 앱 빌드
```bash
cd expo-app
npx eas build --platform android
```

---

## 💡 팁

- **Hot Reload**: 코드 저장하면 자동으로 새로고침됩니다
- **개발자 도구**: 웹 앱은 브라우저 개발자 도구 사용 가능
- **Expo DevTools**: Expo 앱은 `j`를 눌러 디버거 열기

---

## 📚 더 알아보기

- [Expo 문서](https://docs.expo.dev/)
- [Vite 문서](https://vitejs.dev/)
- [React 문서](https://react.dev/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
