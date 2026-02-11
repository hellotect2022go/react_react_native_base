// Firebase 설정 파일
// 실제 Firebase 프로젝트 생성 후 여기에 설정을 추가하세요

// Firebase 콘솔에서 프로젝트 생성 방법:
// 1. https://console.firebase.google.com/ 접속
// 2. 프로젝트 추가
// 3. 프로젝트 설정 > 일반 > 내 앱 > 웹앱 추가
// 4. 아래 firebaseConfig 값을 복사해서 붙여넣기

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Firebase 콘솔에서 실제 설정값으로 교체하세요
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase 초기화
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.log('Firebase 초기화 실패 (테스트 모드):', error.message);
  // 테스트 모드에서는 초기화 실패해도 계속 진행
}

export { auth };
export default app;
