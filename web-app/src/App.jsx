import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import GlobalStyles from './GlobalStyles';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import List2Page from './pages/List2Page';
import SettingsPage from './pages/SettingsPage';
import PhoneAuthPage from './pages/auth/PhoneAuthPage';
import VerifyCodePage from './pages/auth/VerifyCodePage';
import GoogleAuthPage from './pages/auth/GoogleAuthPage';
import ProfileSetupPage from './pages/auth/ProfileSetupPage';
import ProfileEditPage from './pages/ProfileEditPage';

// 메인 앱 컴포넌트 (인증 상태에 따라 화면 전환)
function MainApp() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [authStep, setAuthStep] = useState('phone'); // 'phone', 'verify', 'google', 'profile'

  // URL 해시로 인증 단계 관리 (간단한 라우팅)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'verify') setAuthStep('verify');
      else if (hash === 'google') setAuthStep('google');
      else if (hash === 'profile') setAuthStep('profile');
      else if (hash === 'profile-edit') setAuthStep('profile-edit');
      else setAuthStep('phone');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 인증되지 않은 경우: 인증 화면 표시
  if (!user) {
    if (authStep === 'verify') {
      return <VerifyCodePage />;
    }
    if (authStep === 'google') {
      return <GoogleAuthPage />;
    }
    return <PhoneAuthPage />;
  }

  // 프로필 수정 페이지 (인증 후 언제든 접근 가능)
  if (authStep === 'profile-edit') {
    return <ProfileEditPage />;
  }

  // 인증은 되었지만 프로필 설정이 안 된 경우
  if (!user.profileComplete) {
    return <ProfileSetupPage />;
  }

  // 인증 + 프로필 완료: 메인 앱 화면
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'list':
        return <ListPage />;
      case 'list2':
        return <List2Page />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MainLayout onPageChange={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

// App 컴포넌트 (Providers 래핑)
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyles />
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
