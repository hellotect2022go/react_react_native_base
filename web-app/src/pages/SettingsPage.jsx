import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card.styled';

const Container = styled.div`
  padding: 20px 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin: 0 0 12px 0;
`;

const SettingCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.border};
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  ${props => props.$clickable && `
    &:active {
      background: ${props.theme.inputBg};
    }
  `}
`;

const SettingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SettingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const SettingInfo = styled.div``;

const SettingLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 2px;
`;

const SettingDescription = styled.div`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};
`;

const ToggleSwitch = styled.div`
  width: 52px;
  height: 30px;
  border-radius: 15px;
  background: ${props => props.$checked ? props.theme.gradient : props.theme.border};
  position: relative;
  cursor: pointer;
  transition: all 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.$checked ? '25px' : '3px'};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: all 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Arrow = styled.div`
  font-size: 18px;
  color: ${props => props.theme.textTertiary};
`;

const ProfileSection = styled(Card)`
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  border-radius: 50%;
  // background: ${props => props.theme.gradient};
   background: ${props => props.$hasImage 
    ? `url(${props.$imageUrl}) center/cover` 
    : props.theme.inputBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  box-shadow: 0 4px 16px ${props => props.theme.shadowStrong};
`;

const ProfileName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin: 0 0 6px 0;
`;

const ProfileBio = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin: 0 0 16px 0;
`;

const EditButton = styled.button`
  padding: 10px 24px;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 20px;
  background: transparent;
  color: ${props => props.theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const VersionInfo = styled.div`
  text-align: center;
  padding: 20px;
  color: ${props => props.theme.textTertiary};
  font-size: 13px;
`;

function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  console.log('👤 사용자 정보:', user);


  // 로그아웃 처리
  const handleLogout = async () => {
    if (window.confirm('정말 로그아웃 하시겠습니까?')) {
      await logout();
      window.location.reload();
    }
  };

  return (
    <Container>
      <Header>
        <Title>설정 ⚙️</Title>
        <Subtitle>앱 설정 및 개인정보 관리</Subtitle>
      </Header>

      <ProfileSection>
        <ProfileAvatar
          $hasImage={!!user?.profileImage}
          $imageUrl={user?.profileImage}>
            {!user?.profileImage && (user?.avatar || '👤')}
        </ProfileAvatar>
        
        <ProfileName>{user?.displayName || user?.nickname || '내 프로필'}</ProfileName>
        <ProfileBio>
          {user?.bio || '안녕하세요!'}
          {user?.email && <><br />{user.email}</>}
        </ProfileBio>
        <EditButton onClick={() => window.location.hash = '#profile-edit'}>프로필 수정</EditButton>
      </ProfileSection>

      <Section>
        <SectionTitle>테마</SectionTitle>
        <SettingCard>
          <SettingItem>
            <SettingLeft>
              <SettingIcon>{isDark ? '🌙' : '☀️'}</SettingIcon>
              <SettingInfo>
                <SettingLabel>다크 모드</SettingLabel>
                <SettingDescription>
                  {isDark ? '어두운 테마 사용 중' : '밝은 테마 사용 중'}
                </SettingDescription>
              </SettingInfo>
            </SettingLeft>
            <ToggleSwitch $checked={isDark} onClick={toggleTheme} />
          </SettingItem>
        </SettingCard>
      </Section>

      <Section>
        <SectionTitle>계정</SectionTitle>
        <SettingCard>
          <SettingItem $clickable>
            <SettingLeft>
              <SettingIcon>👤</SettingIcon>
              <SettingInfo>
                <SettingLabel>개인정보</SettingLabel>
                <SettingDescription>나이, 지역, 성별 설정</SettingDescription>
              </SettingInfo>
            </SettingLeft>
            <Arrow>›</Arrow>
          </SettingItem>
          <SettingItem $clickable>
            <SettingLeft>
              <SettingIcon>🔔</SettingIcon>
              <SettingInfo>
                <SettingLabel>알림 설정</SettingLabel>
                <SettingDescription>메시지 및 활동 알림</SettingDescription>
              </SettingInfo>
            </SettingLeft>
            <Arrow>›</Arrow>
          </SettingItem>
          <SettingItem $clickable>
            <SettingLeft>
              <SettingIcon>🔒</SettingIcon>
              <SettingInfo>
                <SettingLabel>프라이버시</SettingLabel>
                <SettingDescription>차단 및 공개 범위</SettingDescription>
              </SettingInfo>
            </SettingLeft>
            <Arrow>›</Arrow>
          </SettingItem>
        </SettingCard>
      </Section>

      <Section>
        <SectionTitle>지원</SectionTitle>
        <SettingCard>
          <SettingItem $clickable>
            <SettingLeft>
              <SettingIcon>❓</SettingIcon>
              <SettingInfo>
                <SettingLabel>도움말</SettingLabel>
                <SettingDescription>자주 묻는 질문</SettingDescription>
              </SettingInfo>
            </SettingLeft>
            <Arrow>›</Arrow>
          </SettingItem>
          <SettingItem $clickable>
            <SettingLeft>
              <SettingIcon>📧</SettingIcon>
              <SettingInfo>
                <SettingLabel>문의하기</SettingLabel>
                <SettingDescription>의견 및 버그 리포트</SettingDescription>
              </SettingInfo>
            </SettingLeft>
            <Arrow>›</Arrow>
          </SettingItem>
          <SettingItem $clickable>
            <SettingLeft>
              <SettingIcon>⚖️</SettingIcon>
              <SettingInfo>
                <SettingLabel>약관 및 정책</SettingLabel>
                <SettingDescription>이용약관, 개인정보처리방침</SettingDescription>
              </SettingInfo>
            </SettingLeft>
            <Arrow>›</Arrow>
          </SettingItem>
        </SettingCard>
      </Section>

      <Section>
        <SettingCard>
          <SettingItem $clickable onClick={handleLogout}>
            <SettingLeft>
              <SettingIcon style={{ background: '#EF4444' }}>🚪</SettingIcon>
              <SettingInfo>
                <SettingLabel style={{ color: '#EF4444' }}>로그아웃</SettingLabel>
              </SettingInfo>
            </SettingLeft>
            <Arrow>›</Arrow>
          </SettingItem>
        </SettingCard>
      </Section>

      <VersionInfo>
        버전 1.0.0 • Made with 💕
      </VersionInfo>
    </Container>
  );
}

export default SettingsPage;
