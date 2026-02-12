import { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../config/firebase';
// import { 
//   signInWithPhoneNumber, 
//   RecaptchaVerifier,
//   GoogleAuthProvider,
//   signInWithPopup,
//   linkWithCredential,
//   PhoneAuthProvider
// } from 'firebase/auth';

// 인증 Context 생성
const AuthContext = createContext();

// 인증 Context 사용을 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// 인증 Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');

  // 로컬스토리지에서 사용자 정보 로드
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ==================== SMS 인증 관련 함수 ====================
  
  /**
   * SMS 인증 코드 전송
   * @param {string} phoneNumber - 전화번호 (예: +821012345678)
   * @param {HTMLElement} recaptchaContainer - reCAPTCHA 컨테이너
   * @returns {Promise<string>} - verificationId
   */
  const sendSMSCode = async (phoneNumber, recaptchaContainer) => {
    try {
      console.log('📱 SMS 전송 시작:', phoneNumber);
      
      // TODO: Firebase 설정 후 주석 해제
      // const recaptchaVerifier = new RecaptchaVerifier(
      //   recaptchaContainer,
      //   { size: 'invisible' },
      //   auth
      // );
      
      // const confirmationResult = await signInWithPhoneNumber(
      //   auth,
      //   phoneNumber,
      //   recaptchaVerifier
      // );
      
      // setVerificationId(confirmationResult.verificationId);
      // setPhoneNumber(phoneNumber);
      
      // return confirmationResult.verificationId;

      // ===== 테스트 모드 =====
      setPhoneNumber(phoneNumber);
      const testVerificationId = 'test-verification-id-' + Date.now();
      setVerificationId(testVerificationId);
      console.log('✅ SMS 전송 완료 (테스트 모드)');
      return testVerificationId;
      
    } catch (error) {
      console.error('❌ SMS 전송 실패:', error);
      throw new Error('SMS 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /**
   * SMS 인증 코드 확인
   * @param {string} code - 6자리 인증 코드
   * @returns {Promise<Object>} - 사용자 정보
   */
  const verifySMSCode = async (code) => {
    try {
      console.log('🔍 코드 확인 시작:', code);

      // TODO: Firebase 설정 후 주석 해제
      // const credential = PhoneAuthProvider.credential(verificationId, code);
      // const result = await signInWithCredential(auth, credential);
      // 
      // Firebase 사용 시:
      // - Firebase가 전화번호를 안전하게 관리
      // - 우리는 익명화된 UID만 사용
      // - 전화번호는 Firebase에만 저장됨
      // 
      // const userData = {
      //   uid: result.user.uid,  // Firebase UID (익명화됨)
      //   isNewUser: result.additionalUserInfo.isNewUser,
      //   authProvider: 'phone',
      //   // phoneNumber는 저장하지 않음!
      // };
      
      // ===== 테스트 모드 =====
      // 테스트 코드: 123456 또는 아무 6자리 숫자
      if (code.length !== 6) {
        throw new Error('6자리 코드를 입력해주세요.');
      }

      const userData = {
        uid: 'test-user-' + Date.now(),
        phoneNumber: phoneNumber,
        isNewUser: true,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('✅ 인증 완료 (테스트 모드)');
      
      return userData;
      
    } catch (error) {
      console.error('❌ 코드 확인 실패:', error);
      throw new Error('인증 코드가 올바르지 않습니다.');
    }
  };

  // ==================== Google 로그인 관련 함수 ====================
  
  /**
   * Google 로그인 (전화번호와 연동)
   * @returns {Promise<Object>} - 사용자 정보
   */
  const signInWithGoogle = async () => {
    try {
      console.log('🔐 Google 로그인 시작');

      // TODO: Firebase 설정 후 주석 해제
      // const provider = new GoogleAuthProvider();
      // const result = await signInWithPopup(auth, provider);
      
      // // 이미 전화번호로 로그인한 사용자와 Google 계정 연동
      // if (user && user.phoneNumber) {
      //   const phoneCredential = PhoneAuthProvider.credential(
      //     verificationId,
      //     code
      //   );
      //   await linkWithCredential(result.user, phoneCredential);
      // }
      
      // const userData = {
      //   uid: result.user.uid,
      //   email: result.user.email,
      //   displayName: result.user.displayName,
      //   photoURL: result.user.photoURL,
      //   phoneNumber: user?.phoneNumber,
      // };

      // ===== 테스트 모드 =====
      const userData = {
        ...user,  // 기존 유저 정보 유지 (uid 등)
        email: 'test@gmail.com',
        displayName: '테스트 유저',
        photoURL: '👤',
        phoneNumber: user?.phoneNumber || '+821012345678',
        provider: 'google',
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('✅ Google 로그인 완료 (테스트 모드)');
      
      return userData;
      
    } catch (error) {
      console.error('❌ Google 로그인 실패:', error);
      throw new Error('Google 로그인에 실패했습니다.');
    }
  };

  /**
   * 사용자 프로필 업데이트
   * @param {string} userId - 사용자 ID
   * @param {Object} profileData - 프로필 데이터
   * @returns {Promise<Object>} - 업데이트된 사용자 정보
   */
  const updateUserProfile = async (userId, profileData) => {
    try {
      console.log('📝 프로필 업데이트:', profileData);

      // TODO: Firebase 설정 후 주석 해제
      // const userRef = doc(db, 'users', userId);
      // await updateDoc(userRef, profileData);

      // ===== 테스트 모드 =====
      const updatedUser = {
        ...user,
        ...profileData,
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('✅ 프로필 업데이트 완료 (테스트 모드)');

      return updatedUser;

    } catch (error) {
      console.error('❌ 프로필 업데이트 실패:', error);
      throw new Error('프로필 업데이트에 실패했습니다.');
    }
  };

  /**
   * 로그아웃
   */
  const logout = async () => {
    try {
      // TODO: Firebase 설정 후 주석 해제
      // await signOut(auth);
      
      setUser(null);
      setPhoneNumber('');
      setVerificationId('');
      localStorage.removeItem('user');
      console.log('✅ 로그아웃 완료');
      
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
      throw error;
    }
  };

  /**
   * 테스트용: 인증 건너뛰기
   * Firebase SMS 인증과 동일한 형태로 UID + refreshToken 생성
   */
  const skipAuth = () => {
    // UUID 형태로 UID 생성
    const generateUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    // refreshToken 생성 (Firebase 형태로 긴 랜덤 문자열)
    const generateRefreshToken = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      let token = '';
      for (let i = 0; i < 120; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return token;
    };

    const uid = generateUUID();
    const refreshToken = generateRefreshToken();
    
    const testUser = {
      uid: uid,
      refreshToken: refreshToken,
      displayName: '테스트 유저',
      authProvider: 'test',
      isTestMode: true,
      createdAt: new Date().toISOString(),
      // phoneNumber는 저장하지 않음!
    };
    
    setUser(testUser);
    localStorage.setItem('user', JSON.stringify(testUser));
    
    console.log('⚠️ 인증 건너뛰기 (개발 모드)');
    console.log('🔐 테스트 UID:', uid);
    console.log('🎫 테스트 refreshToken:', refreshToken);
    console.log('📦 전체 유저 데이터:', testUser);
  };

  // Context에 제공할 값
  const value = {
    user,
    setUser,
    loading,
    phoneNumber,
    sendSMSCode,
    verifySMSCode,
    signInWithGoogle,
    updateUserProfile,
    logout,
    skipAuth, // 테스트용
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
