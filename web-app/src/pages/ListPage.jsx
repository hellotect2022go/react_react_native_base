import { useState } from 'react';
import styled from 'styled-components';
import { mockChatRooms } from '../data/mockData';
import { Card, Avatar } from '../components/common/Card.styled';
import { SearchInput, InputWrapper, InputIcon } from '../components/common/Input.styled';

const Container = styled.div`
  padding: 20px 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
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
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin: 0 0 20px 0;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  position: relative;
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const ChatName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChatTime = styled.span`
  font-size: 12px;
  color: ${props => props.theme.textTertiary};
  white-space: nowrap;
  margin-left: 8px;
`;

const LastMessage = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UnreadBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  border-radius: 12px;
  background: ${props => props.theme.gradient};
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px ${props => props.theme.shadowStrong};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${props => props.theme.textSecondary};
  
  div:first-child {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  div:nth-child(2) {
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.text};
    margin-bottom: 8px;
  }
  
  div:last-child {
    font-size: 14px;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.$active ? props.theme.gradient : props.theme.inputBg};
  color: ${props => props.$active ? 'white' : props.theme.textSecondary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

function ListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: '전체', icon: '💬' },
    { id: 'unread', label: '안읽음', icon: '🔔' },
    { id: 'favorite', label: '즐겨찾기', icon: '⭐' },
  ];

  const filteredChats = mockChatRooms.filter(chat => {
    const matchSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === 'all' || 
                       (activeFilter === 'unread' && chat.unreadCount > 0);
    return matchSearch && matchFilter;
  });

  const totalUnread = mockChatRooms.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <Container>
      <Header>
        <Title>채팅 목록 💬</Title>
        <Subtitle>
          {totalUnread > 0 ? `${totalUnread}개의 안읽은 메시지가 있습니다` : '모든 메시지를 읽었습니다'}
        </Subtitle>

        <InputWrapper style={{ marginBottom: '16px' }}>
          <InputIcon>🔍</InputIcon>
          <SearchInput
            type="text"
            placeholder="채팅방 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            $hasIcon
          />
        </InputWrapper>

        <FilterTabs>
          {filters.map(filter => (
            <FilterTab
              key={filter.id}
              $active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.icon} {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>
      </Header>

      <ChatList>
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <ChatCard key={chat.id} $clickable>
              <Avatar $size="56px" $online={chat.online}>
                {chat.avatar}
              </Avatar>
              <ChatInfo>
                <ChatHeader>
                  <ChatName>{chat.name}</ChatName>
                  <ChatTime>{chat.lastTime}</ChatTime>
                </ChatHeader>
                <LastMessage>{chat.lastMessage}</LastMessage>
              </ChatInfo>
              {chat.unreadCount > 0 && (
                <UnreadBadge>{chat.unreadCount}</UnreadBadge>
              )}
            </ChatCard>
          ))
        ) : (
          <EmptyState>
            <div>💬</div>
            <div>채팅방이 없습니다</div>
            <div>새로운 사람과 대화를 시작해보세요!</div>
          </EmptyState>
        )}
      </ChatList>
    </Container>
  );
}

export default ListPage;
