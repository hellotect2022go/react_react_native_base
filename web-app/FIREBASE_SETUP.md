# 🔥 Firebase SMS 인증 구현 가이드

## 📱 구현된 기능

### ✅ 완성된 기능
1. **SMS 인증 화면** - 전화번호 입력 및 인증 코드 전송
2. **코드 확인 화면** - 6자리 인증 코드 입력
3. **Google 연동 화면** - Google 계정과 전화번호 연동
4. **테스트 모드** - Firebase 설정 없이도 테스트 가능
5. **로그아웃** - 설정 페이지에서 로그아웃 기능

### 🎯 현재 상태
- ✅ UI/UX 완성
- ✅ 인증 플로우 완성
- ✅ 테스트 모드로 동작 중
- ⏳ Firebase 설정 대기 (API 키 필요)

---

## 🚀 Firebase 설정 방법 (나중에 진행)

### 1단계: Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: chatapp)
4. Google 애널리틱스 설정 (선택사항)
5. 프로젝트 생성 완료

### 2단계: 웹 앱 추가

1. 프로젝트 개요 > 웹 앱 추가 (</> 아이콘)
2. 앱 닉네임 입력
3. Firebase SDK 설정 정보 복사

### 3단계: Firebase 패키지 설치

```bash
cd web-app
npm install firebase
```

### 4단계: Firebase 설정 파일 수정

`src/config/firebase.js` 파일에서 설정값 교체:

```javascript
const firebaseConfig = {
  apiKey: "여기에_API_KEY",
  authDomain: "여기에_AUTH_DOMAIN",
  projectId: "여기에_PROJECT_ID",
  storageBucket: "여기에_STORAGE_BUCKET",
  messagingSenderId: "여기에_MESSAGING_SENDER_ID",
  appId: "여기에_APP_ID"
};
```

### 5단계: Authentication 설정

1. Firebase Console > Authentication 메뉴
2. "시작하기" 클릭
3. 로그인 방법 탭에서 "전화" 활성화
4. "Google" 로그인 방법도 활성화

### 6단계: 테스트 전화번호 추가 (선택)

1. Authentication > Settings > Phone numbers for testing
2. 테스트용 전화번호와 코드 추가 (예: +821012345678 / 123456)

### 7단계: 코드 활성화

`src/contexts/AuthContext.jsx` 파일에서 주석 해제:

```javascript
// TODO: Firebase 설정 후 주석 해제
// 이 부분들의 주석을 제거하세요
```

---

## 💰 Firebase 무료 플랜 제한

```
✅ SMS 인증: 월 10,000건 무료
✅ Authentication: 무제한
✅ Realtime Database: 1GB 저장소
✅ Hosting: 10GB/월 전송량

💵 초과 시:
- SMS: 건당 $0.006 (약 8원)
```

---

## 🧪 테스트 모드 사용법

### 현재 테스트 모드 기능

1. **전화번호 입력**
   - 아무 번호나 입력 (예: 01012345678)
   - "인증 코드 받기" 클릭

2. **인증 코드 입력**
   - 아무 6자리 숫자 입력 (예: 123456)
   - 자동으로 인증 완료

3. **인증 건너뛰기**
   - 첫 화면에서 "인증 건너뛰기" 버튼 클릭
   - 바로 메인 화면으로 이동

4. **로그아웃**
   - 설정 페이지 > 로그아웃 클릭
   - 다시 로그인 화면으로 이동

---

## 📁 파일 구조

```
web-app/src/
├── config/
│   └── firebase.js              # Firebase 설정 (API 키 입력 필요)
├── contexts/
│   ├── AuthContext.jsx          # 인증 로직 (SMS, Google)
│   └── ThemeContext.jsx         # 테마 관리
├── pages/
│   └── auth/
│       ├── PhoneAuthPage.jsx    # 전화번호 입력 화면
│       ├── VerifyCodePage.jsx   # 코드 확인 화면
│       └── GoogleAuthPage.jsx   # Google 연동 화면
└── App.jsx                      # 메인 앱 (인증 흐름 관리)
```

---

## 🎨 API 주석 설명

### AuthContext API

```javascript
const {
  user,              // 현재 로그인한 사용자 정보
  loading,           // 로딩 상태
  phoneNumber,       // 입력한 전화번호
  sendSMSCode,       // SMS 코드 전송
  verifySMSCode,     // SMS 코드 확인
  signInWithGoogle,  // Google 로그인
  logout,            // 로그아웃
  skipAuth,          // 테스트: 인증 건너뛰기
} = useAuth();
```

### SMS 전송 예시

```javascript
// SMS 인증 코드 전송
await sendSMSCode(
  '+821012345678',      // 전화번호 (국가코드 포함)
  'recaptcha-container' // reCAPTCHA 컨테이너 ID
);
```

### 코드 확인 예시

```javascript
// 인증 코드 확인
const userData = await verifySMSCode('123456');
console.log(userData);
// {
//   uid: 'user-id',
//   phoneNumber: '+821012345678',
//   isNewUser: true
// }
```

### Google 로그인 예시

```javascript
// Google 계정으로 로그인
const userData = await signInWithGoogle();
console.log(userData);
// {
//   uid: 'google-user-id',
//   email: 'user@gmail.com',
//   displayName: '사용자 이름',
//   photoURL: 'profile-image-url',
//   phoneNumber: '+821012345678'
// }
```

---

## 🔧 실제 운영 시 수정 사항

### 1. Firebase 설정 활성화

```javascript
// src/config/firebase.js
// API 키를 실제 값으로 변경

// src/contexts/AuthContext.jsx
// TODO 주석 제거하고 Firebase 코드 활성화
```

### 2. 테스트 코드 제거

```javascript
// 개발용 버튼 제거
<Button onClick={skipAuth}>
  인증 건너뛰기 (테스트용)
</Button>
```

### 3. 보안 강화

```javascript
// IP당 요청 제한
// 의심스러운 전화번호 차단
// reCAPTCHA 점수 확인
```

---

## 📞 문의 및 지원

Firebase 설정이 완료되면:
1. `src/config/firebase.js`에 API 키 입력
2. `src/contexts/AuthContext.jsx`의 TODO 주석 제거
3. Firebase 패키지 설치 (`npm install firebase`)
4. 앱 재시작

---

## 🎯 다음 단계

- [ ] Firebase 프로젝트 생성
- [ ] API 키 발급
- [ ] Firebase 패키지 설치
- [ ] 코드 주석 제거 및 활성화
- [ ] 실제 SMS 테스트
- [ ] Google 로그인 테스트
- [ ] 백엔드 API 연동 (/z/dhhan/00.project/06.chatapp)

현재는 **테스트 모드**로 모든 기능이 동작합니다! 🚀
