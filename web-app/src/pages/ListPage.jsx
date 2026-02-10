import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  padding: 24px 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 44px;
  border: none;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  font-size: 15px;
  color: #1f2937;
  transition: box-shadow 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #9ca3af;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 24px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#6b7280'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const ListGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardDescription = styled.div`
  font-size: 14px;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
`;

const CardTime = styled.div`
  font-size: 13px;
  color: #9ca3af;
  white-space: nowrap;
`;

function ListPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: '전체' },
    { id: 'recent', label: '최근' },
    { id: 'important', label: '중요' },
    { id: 'completed', label: '완료' },
    { id: 'pending', label: '대기' },
  ];

  const items = [
    {
      id: 1,
      icon: '📱',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      title: '모바일 앱 개발',
      description: 'React Native 기반 크로스 플랫폼 앱',
      tags: ['개발', '긴급'],
      time: '2시간 전'
    },
    {
      id: 2,
      icon: '🎨',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      title: 'UI/UX 디자인',
      description: '새로운 랜딩 페이지 디자인 작업',
      tags: ['디자인', '진행중'],
      time: '5시간 전'
    },
    {
      id: 3,
      icon: '📊',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      title: '데이터 분석',
      description: '사용자 행동 패턴 분석 리포트',
      tags: ['분석', '완료'],
      time: '1일 전'
    },
    {
      id: 4,
      icon: '🚀',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      title: '배포 준비',
      description: '프로덕션 환경 배포 체크리스트',
      tags: ['배포', '검토'],
      time: '2일 전'
    },
    {
      id: 5,
      icon: '📝',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      title: '문서 작성',
      description: 'API 명세서 및 사용자 가이드',
      tags: ['문서', '진행중'],
      time: '3일 전'
    },
  ];

  return (
    <Container>
      <Header>
        <Title>목록</Title>
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <FilterTabs>
          {filters.map(filter => (
            <FilterTab
              key={filter.id}
              $active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>
      </Header>

      <ListGrid>
        {items.map(item => (
          <ListCard key={item.id}>
            <CardHeader>
              <CardIcon $color={item.color}>{item.icon}</CardIcon>
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </CardHeader>
            <CardFooter>
              <CardTags>
                {item.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </CardTags>
              <CardTime>{item.time}</CardTime>
            </CardFooter>
          </ListCard>
        ))}
      </ListGrid>
    </Container>
  );
}

export default ListPage;
