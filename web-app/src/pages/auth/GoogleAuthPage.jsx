import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: ${props => props.theme.background};
  overflow: hidden;
`;

const Logo = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${props => props.theme.textSecondary};
  margin: 0 0 48px 0;
  text-align: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${props => props.theme.cardBg};
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 32px ${props => props.theme.shadowStrong};
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .text {
    font-size: 18px;
    color: ${props => props.theme.text};
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .phone {
    font-size: 14px;
    color: ${props => props.theme.textSecondary};
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: white;
  color: #333;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GoogleIcon = styled.span`
  font-size: 24px;
`;

const SkipButton = styled.button`
  width: 100%;
  padding: 14px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: transparent;
  color: ${props => props.theme.textSecondary};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const Info = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textTertiary};
  text-align: center;
  margin-top: 24px;
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  background: #FEE;
  color: #C00;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
`;

function GoogleAuthPage() {
  const { signInWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Google 로그인 처리
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      // 성공하면 자동으로 메인 화면으로 이동
    } catch (err) {
      setError(err.message || 'Google 로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 나중에 하기 (건너뛰기)
  const handleSkip = () => {
    window.location.reload();
  };

  return (
    <Container>
      <Logo>🎉</Logo>
      <Title>인증 완료!</Title>
      <Subtitle>Google 계정과 연동하시겠어요?</Subtitle>

      <Card>
        <WelcomeMessage>
          <div className="icon">✅</div>
          <div className="text">전화번호 인증이 완료되었습니다</div>
          <div className="phone">{user?.phoneNumber}</div>
        </WelcomeMessage>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <GoogleButton onClick={handleGoogleSignIn} disabled={loading}>
          <GoogleIcon>🔐</GoogleIcon>
          {loading ? '연동 중...' : 'Google 계정 연동하기'}
        </GoogleButton>

        <SkipButton onClick={handleSkip}>
          나중에 하기
        </SkipButton>

        <Info>
          💡 Google 계정을 연동하면 다음부터 더 쉽게 로그인할 수 있어요.<br />
          전화번호와 이메일이 함께 저장됩니다.
        </Info>
      </Card>
    </Container>
  );
}

export default GoogleAuthPage;
