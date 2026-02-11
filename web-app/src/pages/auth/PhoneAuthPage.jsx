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
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const Title = styled.h1`
  font-size: 32px;
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

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CountryCode = styled.div`
  width: 80px;
  padding: 14px 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 15px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.shadow};
  }

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: ${props => props.$variant === 'outlined' 
    ? 'transparent' 
    : props.theme.gradient};
  border: ${props => props.$variant === 'outlined' 
    ? `2px solid ${props.theme.border}` 
    : 'none'};
  color: ${props => props.$variant === 'outlined' 
    ? props.theme.textSecondary 
    : 'white'};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Info = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textTertiary};
  text-align: center;
  margin-top: 16px;
  line-height: 1.5;
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

const SuccessMessage = styled.div`
  background: #E7F9F0;
  color: #10B981;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.border};
  }
  
  span {
    color: ${props => props.theme.textTertiary};
    font-size: 13px;
  }
`;

function PhoneAuthPage() {
  const { sendSMSCode, skipAuth } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 전화번호 포맷팅 (숫자만 입력)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 11) {
      setPhoneNumber(value);
    }
  };

  // SMS 인증 코드 전송
  const handleSendCode = async () => {
    setError('');
    setSuccess('');

    // 전화번호 검증
    if (!phoneNumber) {
      setError('전화번호를 입력해주세요.');
      return;
    }

    if (phoneNumber.length < 10) {
      setError('올바른 전화번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 한국 국가코드 추가
      const fullPhoneNumber = `+82${phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber}`;
      
      // SMS 전송 (reCAPTCHA 컨테이너는 나중에 추가)
      await sendSMSCode(fullPhoneNumber, 'recaptcha-container');
      
      setSuccess('인증 코드가 전송되었습니다! 📱');
      
      // 3초 후 인증 코드 입력 페이지로 이동
      setTimeout(() => {
        window.location.href = '#verify';
      }, 2000);
      
    } catch (err) {
      setError(err.message || '인증 코드 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 테스트용: 인증 건너뛰기 (자동으로 UID + refreshToken 생성)
  const handleSkipAuth = () => {
    console.log('🚀 인증 건너뛰기 실행...');
    skipAuth(); // UID와 refreshToken 자동 생성
    console.log('✅ UID와 refreshToken이 생성되었습니다.');
    // 생성된 후 자동으로 프로필 설정 페이지로 이동하지 않음
    // (App.jsx에서 user 상태 변화를 감지하여 자동으로 ProfileSetupPage로 이동)
  };

  return (
    <Container>
      <Logo>💕</Logo>
      <Title>환영합니다!</Title>
      <Subtitle>전화번호로 간편하게 시작하세요</Subtitle>

      <Card>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <InputGroup>
          <Label>전화번호</Label>
          <PhoneInputWrapper>
            <CountryCode>🇰🇷 +82</CountryCode>
            <Input
              type="tel"
              placeholder="1012345678"
              value={phoneNumber}
              onChange={handlePhoneChange}
              disabled={loading}
            />
          </PhoneInputWrapper>
        </InputGroup>

        <Button 
          onClick={handleSendCode} 
          disabled={loading || !phoneNumber}
        >
          {loading ? '전송 중...' : '인증 코드 받기'}
        </Button>

        <Divider>
          <span>개발 모드</span>
        </Divider>

        <Button 
          $variant="outlined"
          onClick={handleSkipAuth}
        >
          🚀 인증 건너뛰기 (테스트용)
        </Button>

        <Info>
          📱 SMS로 6자리 인증 코드를 보내드립니다.<br />
          일반 문자 요금이 부과될 수 있습니다.
        </Info>

        {/* reCAPTCHA 컨테이너 (나중에 Firebase 설정 후 사용) */}
        <div id="recaptcha-container"></div>
      </Card>
    </Container>
  );
}

export default PhoneAuthPage;
