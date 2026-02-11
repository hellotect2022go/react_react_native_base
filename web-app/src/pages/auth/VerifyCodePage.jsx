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
  margin: 0 0 8px 0;
  text-align: center;
`;

const PhoneNumber = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin-bottom: 48px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${props => props.theme.cardBg};
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 32px ${props => props.theme.shadowStrong};
`;

const CodeInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
`;

const CodeInput = styled.input`
  width: 50px;
  height: 60px;
  border: 2px solid ${props => props.$filled 
    ? props.theme.primary 
    : props.theme.border};
  border-radius: 12px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.shadow};
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

const ResendButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: transparent;
  color: ${props => props.theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Timer = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 16px;
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

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
  cursor: pointer;
  margin-top: 16px;
  padding: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

function VerifyCodePage() {
  const { verifySMSCode, phoneNumber } = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(180); // 3분 타이머

  // 코드 입력 처리
  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // 숫자만 허용

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 자동으로 다음 입력칸으로 이동
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // 6자리 모두 입력되면 자동 확인
    if (newCode.every(digit => digit) && newCode.join('').length === 6) {
      handleVerifyCode(newCode.join(''));
    }
  };

  // 백스페이스 처리
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async (codeString = null) => {
    const verificationCode = codeString || code.join('');
    
    setError('');
    setSuccess('');

    if (verificationCode.length !== 6) {
      setError('6자리 코드를 모두 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      await verifySMSCode(verificationCode);
      setSuccess('인증 완료! 🎉');
      
      // 인증 완료 후 프로필 설정 페이지로 이동
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      setError(err.message || '인증에 실패했습니다.');
      setCode(['', '', '', '', '', '']); // 코드 초기화
      const firstInput = document.getElementById('code-input-0');
      if (firstInput) firstInput.focus();
    } finally {
      setLoading(false);
    }
  };

  // 코드 재전송
  const handleResendCode = () => {
    setError('');
    setSuccess('새로운 인증 코드를 전송했습니다! 📱');
    setCode(['', '', '', '', '', '']);
    setTimer(180);
    const firstInput = document.getElementById('code-input-0');
    if (firstInput) firstInput.focus();
  };

  // 이전 화면으로
  const handleBack = () => {
    window.location.href = '#phone';
  };

  return (
    <Container>
      <Logo>🔐</Logo>
      <Title>인증 코드 입력</Title>
      <Subtitle>전송된 6자리 코드를 입력하세요</Subtitle>
      <PhoneNumber>{phoneNumber || '+82 10-1234-5678'}</PhoneNumber>

      <Card>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <CodeInputWrapper>
          {code.map((digit, index) => (
            <CodeInput
              key={index}
              id={`code-input-${index}`}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading}
              $filled={!!digit}
              autoFocus={index === 0}
            />
          ))}
        </CodeInputWrapper>

        <Timer>⏱️ 남은 시간: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Timer>

        <Button 
          onClick={() => handleVerifyCode()} 
          disabled={loading || code.some(digit => !digit)}
        >
          {loading ? '확인 중...' : '인증하기'}
        </Button>

        <ResendButton onClick={handleResendCode} disabled={loading}>
          인증 코드를 받지 못하셨나요? 재전송
        </ResendButton>

        <BackButton onClick={handleBack}>
          ← 전화번호 다시 입력
        </BackButton>

        <div style={{ 
          fontSize: '12px', 
          color: '#999', 
          textAlign: 'center', 
          marginTop: '24px',
          padding: '12px',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          💡 <strong>테스트 모드:</strong> 아무 6자리 숫자나 입력하면 인증됩니다 (예: 123456)
        </div>
      </Card>
    </Container>
  );
}

export default VerifyCodePage;
