# 🔐 개인정보 보호 및 보안 가이드

## 📱 전화번호 처리 방식

### ❌ 하지 말아야 할 것
```javascript
// 나쁜 예: 전화번호를 그대로 저장
const user = {
  phoneNumber: '+821012345678',  // ❌ 개인정보 직접 저장
};
localStorage.setItem('user', JSON.stringify(user));
```

### ✅ 올바른 방식

#### 1. Firebase Authentication 사용 (추천!)

```javascript
// Firebase가 전화번호를 안전하게 관리
// 우리는 익명화된 UID만 사용

// SMS 인증 후
const result = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
await result.confirm(code);

// 저장되는 데이터
const user = {
  uid: "xK3mP9nQ2RaTbCdEfGhI",  // ✅ Firebase UID (익명화됨)
  authProvider: 'phone',
  // 전화번호는 Firebase에만 저장됨
};
```

**장점:**
- ✅ 전화번호는 Firebase 서버에서 암호화 저장
- ✅ 클라이언트/DB에는 UID만 저장
- ✅ 재로그인 시 Firebase가 자동 매핑
- ✅ GDPR, 개인정보보호법 준수

#### 2. 백엔드에서 해시화 (자체 구현 시)

```javascript
// 프론트엔드
const user = {
  uid: "user_abc123xyz",  // ✅ 익명 고유 ID
  authProvider: 'phone',
  // 전화번호는 저장하지 않음
};

// 백엔드 (Node.js/Go 등)
const crypto = require('crypto');

// 전화번호를 해시화하여 저장
const phoneHash = crypto
  .createHash('sha256')
  .update(phoneNumber + SECRET_SALT)
  .digest('hex');

// DB 저장
db.save({
  userId: "user_abc123xyz",
  phoneHash: phoneHash,  // ✅ 해시값만 저장
  // 원본 전화번호는 저장 안함
});
```

## 🔒 현재 구현 방식

### 프론트엔드 (AuthContext.jsx)

```javascript
// SMS 인증 성공 시
const verifySMSCode = async (code) => {
  // Firebase UID 생성 (실제 Firebase 사용 시)
  // 또는 익명 ID 생성 (테스트 모드)
  
  const anonymousUid = `user_${randomId}_${timestamp}`;
  
  const userData = {
    uid: anonymousUid,        // ✅ 익명 고유 ID
    isNewUser: true,
    authProvider: 'phone',
    // phoneNumber는 저장하지 않음! ✅
  };
  
  // 로컬스토리지에 저장
  localStorage.setItem('user', JSON.stringify(userData));
  
  // 전화번호 정보 삭제
  setPhoneNumber('');  // ✅ 메모리에서도 제거
};
```

### 사용자 식별 방법

| 단계 | 식별자 | 설명 |
|------|--------|------|
| **1. SMS 인증** | 전화번호 | 일회성으로만 사용, 즉시 폐기 |
| **2. UID 생성** | `uid` | Firebase 또는 익명 ID |
| **3. 앱 사용** | `uid` | 모든 API 요청에 사용 |
| **4. 재로그인** | Firebase Auth | 전화번호 → UID 자동 매핑 |

## 📊 데이터 저장 구조

### 클라이언트 (LocalStorage)
```javascript
{
  "uid": "user_abc123_xyz789",    // ✅ 익명 ID
  "nickname": "달콤한밤🌙",
  "age": 25,
  "gender": "여성",
  "region": "서울",
  "bio": "밤에만 활동하는 올빼미입니다 ✨",
  "avatar": "🦋",
  "profileComplete": true,
  "authProvider": "phone"
  // phoneNumber 없음! ✅
}
```

### 백엔드 DB (Firebase/PostgreSQL 등)
```javascript
// users 테이블
{
  "uid": "user_abc123_xyz789",    // PK
  "nickname": "달콤한밤🌙",
  "age": 25,
  "gender": "여성",
  "region": "서울",
  "created_at": "2026-02-10",
  // phoneNumber 없음! ✅
}

// phone_verification 테이블 (별도, 암호화)
{
  "phone_hash": "e3b0c44298fc1c...",  // 해시값
  "uid": "user_abc123_xyz789",         // FK
  "verified_at": "2026-02-10",
  // 원본 전화번호는 저장 안함
}
```

## 🔐 보안 모범 사례

### 1. 전화번호 사용 최소화
```javascript
// ✅ 좋은 예
async function sendSMS(phoneNumber) {
  await smsService.send(phoneNumber, code);
  // 전송 후 즉시 폐기, 저장 안함
}

// ❌ 나쁜 예
async function sendSMS(phoneNumber) {
  await smsService.send(phoneNumber, code);
  db.save({ phone: phoneNumber });  // 저장하지 말 것
}
```

### 2. 토큰 기반 인증
```javascript
// 로그인 성공 후
const token = jwt.sign(
  { uid: user.uid },  // ✅ UID만 포함
  SECRET_KEY,
  { expiresIn: '7d' }
);

// API 요청
headers: {
  'Authorization': `Bearer ${token}`
}
```

### 3. 재로그인 처리
```javascript
// Firebase 사용 시
// 전화번호 입력 → SMS 인증 → Firebase가 자동으로 UID 반환

// 자체 구현 시
// 1. 전화번호 입력
// 2. 백엔드에서 해시 조회
// 3. 해시 매칭 → UID 반환
// 4. 전화번호 폐기
```

## 📜 법적 준수 사항

### 개인정보보호법
- ✅ 전화번호는 "고유식별정보"로 분류
- ✅ 수집 시 별도 동의 필요
- ✅ 암호화 저장 의무
- ✅ 목적 달성 후 즉시 파기

### 처리 방침
```
[필수] SMS 인증
- 수집 목적: 본인 확인
- 보유 기간: 인증 완료 후 즉시 파기
- 저장 위치: Firebase Authentication (암호화)
- 제3자 제공: 하지 않음
```

## 🔄 재로그인 플로우

### Firebase 사용 시
```
1. 사용자: 전화번호 입력
2. Firebase: SMS 전송
3. 사용자: 인증 코드 입력
4. Firebase: UID 반환 (자동 매핑)
5. 앱: UID로 사용자 정보 조회
```

### 자체 백엔드 사용 시
```
1. 사용자: 전화번호 입력
2. 백엔드: SMS 전송, 세션에 해시 저장
3. 사용자: 인증 코드 입력
4. 백엔드: 해시로 UID 조회 → 반환
5. 앱: UID로 사용자 정보 조회
6. 세션에서 전화번호/해시 삭제
```

## 🛡️ 추가 보안 강화

### 1. API 요청 시 UID만 사용
```javascript
// ✅ 좋은 예
GET /api/users/user_abc123xyz/profile
Authorization: Bearer <token>

// ❌ 나쁜 예
GET /api/users/phone/01012345678/profile
```

### 2. 로그에서 전화번호 제거
```javascript
// ✅ 좋은 예
console.log('User logged in:', user.uid);

// ❌ 나쁜 예
console.log('User logged in:', user.phoneNumber);
```

### 3. 에러 메시지 주의
```javascript
// ✅ 좋은 예
throw new Error('인증에 실패했습니다');

// ❌ 나쁜 예
throw new Error(`전화번호 ${phoneNumber}의 인증 실패`);
```

## 📝 체크리스트

### 개발 단계
- [x] 전화번호는 SMS 인증에만 사용
- [x] 인증 완료 후 전화번호 즉시 폐기
- [x] LocalStorage에 전화번호 저장 안함
- [x] UID만 사용하여 사용자 식별
- [x] API 요청에 전화번호 포함 안함
- [x] 로그에 전화번호 출력 안함

### 운영 단계
- [ ] Firebase Authentication 설정
- [ ] HTTPS 적용
- [ ] 백엔드 암호화 적용
- [ ] 개인정보처리방침 작성
- [ ] 사용자 동의 화면 추가
- [ ] 정기 보안 점검

## 🎯 결론

**핵심 원칙:**
```
전화번호는 "인증"에만 사용하고,
"식별"에는 익명화된 UID를 사용한다.
```

**Firebase를 사용하면:**
- ✅ 전화번호 관리를 Firebase에 위임
- ✅ 법적 책임 최소화
- ✅ 보안 걱정 없음
- ✅ 개발자는 UID만 다루면 됨

현재 코드는 이 원칙을 따르고 있습니다! 🎉
