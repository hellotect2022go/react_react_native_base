# Vite + React 웹 앱

Expo 앱의 WebView에서 실행되는 모던한 React 웹 애플리케이션입니다.

## 실행 방법

```bash
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

## 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 미리보기

```bash
npm run preview
```

## 주요 기능

### 카운터
- 버튼을 클릭하여 숫자를 증가시킵니다
- 상태 관리 예제

### 할 일 목록
- 할 일 추가/삭제
- 완료 체크
- 로컬 상태 관리

## 기술 스택

- **Vite**: 빠른 개발 서버
- **React**: UI 라이브러리
- **JavaScript**: 프로그래밍 언어
- **CSS**: 스타일링

## 네트워크 접근

`vite.config.js`에서 네트워크 접근이 활성화되어 있습니다:

```javascript
server: {
  host: true,      // 0.0.0.0으로 바인딩
  port: 5173,
  strictPort: true,
}
```

이를 통해 같은 네트워크의 다른 기기(모바일 앱 등)에서 접근할 수 있습니다.

## 배포

빌드된 `dist` 폴더를 다음 플랫폼에 배포할 수 있습니다:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- 기타 정적 호스팅 서비스
