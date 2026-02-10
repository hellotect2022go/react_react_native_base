import styled from 'styled-components';
import { useState } from 'react';

const HomeContainer = styled.div`
  padding: 24px 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const QuickActions = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const ActionButton = styled.button`
  background: white;
  border: none;
  border-radius: 16px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  }
`;

const ActionIcon = styled.div`
  font-size: 28px;
`;

const ActionLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`;

const RecentSection = styled.div``;

const RecentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RecentIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
`;

const RecentContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const RecentTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RecentTime = styled.div`
  font-size: 13px;
  color: #9ca3af;
`;

function HomePage() {
  return (
    <HomeContainer>
      <Header>
        <Title>안녕하세요! 👋</Title>
        <Subtitle>오늘도 좋은 하루 보내세요</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatValue>24</StatValue>
          <StatLabel>완료된 작업</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>12</StatValue>
          <StatLabel>진행 중</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>8</StatValue>
          <StatLabel>대기 중</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>95%</StatValue>
          <StatLabel>달성률</StatLabel>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <SectionTitle>빠른 실행</SectionTitle>
        <ActionGrid>
          <ActionButton>
            <ActionIcon>📝</ActionIcon>
            <ActionLabel>새 작업</ActionLabel>
          </ActionButton>
          <ActionButton>
            <ActionIcon>📊</ActionIcon>
            <ActionLabel>통계</ActionLabel>
          </ActionButton>
          <ActionButton>
            <ActionIcon>🔔</ActionIcon>
            <ActionLabel>알림</ActionLabel>
          </ActionButton>
          <ActionButton>
            <ActionIcon>📁</ActionIcon>
            <ActionLabel>파일</ActionLabel>
          </ActionButton>
          <ActionButton>
            <ActionIcon>👥</ActionIcon>
            <ActionLabel>팀</ActionLabel>
          </ActionButton>
          <ActionButton>
            <ActionIcon>⚡</ActionIcon>
            <ActionLabel>더보기</ActionLabel>
          </ActionButton>
        </ActionGrid>
      </QuickActions>

      <RecentSection>
        <SectionTitle>최근 활동</SectionTitle>
        <RecentCard>
          <RecentIcon>✅</RecentIcon>
          <RecentContent>
            <RecentTitle>프로젝트 미팅 완료</RecentTitle>
            <RecentTime>5분 전</RecentTime>
          </RecentContent>
        </RecentCard>
        <RecentCard>
          <RecentIcon>📄</RecentIcon>
          <RecentContent>
            <RecentTitle>문서 작성 중</RecentTitle>
            <RecentTime>1시간 전</RecentTime>
          </RecentContent>
        </RecentCard>
        <RecentCard>
          <RecentIcon>💬</RecentIcon>
          <RecentContent>
            <RecentTitle>팀원과 대화</RecentTitle>
            <RecentTime>2시간 전</RecentTime>
          </RecentContent>
        </RecentCard>
      </RecentSection>
    </HomeContainer>
  );
}

export default HomePage;
