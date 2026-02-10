import styled from 'styled-components';

const Container = styled.div`
  padding: 24px 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 32px 0;
`;

const ProfileSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`;

const ProfileEmail = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
  width: 100%;

  &:active {
    transform: scale(0.98);
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const SettingsList = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const SettingItem = styled.button`
  width: 100%;
  padding: 16px 20px;
  border: none;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: #f9fafb;
  }
`;

const SettingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SettingIcon = styled.div`
  font-size: 24px;
`;

const SettingText = styled.div`
  text-align: left;
`;

const SettingLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 2px;
`;

const SettingDescription = styled.div`
  font-size: 13px;
  color: #9ca3af;
`;

const SettingRight = styled.div`
  font-size: 20px;
  color: #d1d5db;
`;

const ToggleSwitch = styled.div`
  width: 48px;
  height: 28px;
  border-radius: 14px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#d1d5db'};
  position: relative;
  transition: all 0.3s;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$active ? '22px' : '2px'};
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: white;
    transition: all 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: white;
  color: #ef4444;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
    background: #fef2f2;
  }
`;

function SettingsPage() {
  return (
    <Container>
      <Title>설정</Title>
      <Subtitle>앱 설정 및 개인정보 관리</Subtitle>

      <ProfileSection>
        <ProfileHeader>
          <Avatar>👤</Avatar>
          <ProfileInfo>
            <ProfileName>사용자 이름</ProfileName>
            <ProfileEmail>user@example.com</ProfileEmail>
          </ProfileInfo>
        </ProfileHeader>
        <EditButton>프로필 편집</EditButton>
      </ProfileSection>

      <SettingsSection>
        <SectionTitle>일반</SectionTitle>
        <SettingsList>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>🔔</SettingIcon>
              <SettingText>
                <SettingLabel>알림</SettingLabel>
                <SettingDescription>푸시 알림 설정</SettingDescription>
              </SettingText>
            </SettingLeft>
            <ToggleSwitch $active={true} />
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>🌙</SettingIcon>
              <SettingText>
                <SettingLabel>다크 모드</SettingLabel>
                <SettingDescription>어두운 테마 사용</SettingDescription>
              </SettingText>
            </SettingLeft>
            <ToggleSwitch $active={false} />
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>🌐</SettingIcon>
              <SettingText>
                <SettingLabel>언어</SettingLabel>
                <SettingDescription>한국어</SettingDescription>
              </SettingText>
            </SettingLeft>
            <SettingRight>›</SettingRight>
          </SettingItem>
        </SettingsList>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>계정</SectionTitle>
        <SettingsList>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>🔒</SettingIcon>
              <SettingText>
                <SettingLabel>개인정보</SettingLabel>
                <SettingDescription>개인정보 설정</SettingDescription>
              </SettingText>
            </SettingLeft>
            <SettingRight>›</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>🔐</SettingIcon>
              <SettingText>
                <SettingLabel>보안</SettingLabel>
                <SettingDescription>비밀번호 및 보안 설정</SettingDescription>
              </SettingText>
            </SettingLeft>
            <SettingRight>›</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>💳</SettingIcon>
              <SettingText>
                <SettingLabel>결제</SettingLabel>
                <SettingDescription>결제 수단 관리</SettingDescription>
              </SettingText>
            </SettingLeft>
            <SettingRight>›</SettingRight>
          </SettingItem>
        </SettingsList>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>기타</SectionTitle>
        <SettingsList>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>❓</SettingIcon>
              <SettingText>
                <SettingLabel>도움말</SettingLabel>
                <SettingDescription>자주 묻는 질문</SettingDescription>
              </SettingText>
            </SettingLeft>
            <SettingRight>›</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>📄</SettingIcon>
              <SettingText>
                <SettingLabel>약관 및 정책</SettingLabel>
                <SettingDescription>이용약관 및 개인정보처리방침</SettingDescription>
              </SettingText>
            </SettingLeft>
            <SettingRight>›</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>ℹ️</SettingIcon>
              <SettingText>
                <SettingLabel>앱 정보</SettingLabel>
                <SettingDescription>버전 1.0.0</SettingDescription>
              </SettingText>
            </SettingLeft>
            <SettingRight>›</SettingRight>
          </SettingItem>
        </SettingsList>
      </SettingsSection>

      <LogoutButton>로그아웃</LogoutButton>
    </Container>
  );
}

export default SettingsPage;
