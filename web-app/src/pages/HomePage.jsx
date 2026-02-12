import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mockUsers, regions } from '../data/mockData';
import { Card, Avatar, Badge } from '../components/common/Card.styled';
import { SearchInput, InputWrapper, InputIcon, Select } from '../components/common/Input.styled';
import { getUsers, BASE_URL } from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';

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

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`;

const FilterLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 6px;
  display: block;
`;

const FilterGroup = styled.div``;

const OnlineIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${props => props.theme.inputBg};
  border-radius: 12px;
  margin-bottom: 16px;
`;

const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const OnlineText = styled.span`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  
  strong {
    color: ${props => props.theme.primary};
    font-weight: 700;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserCard = styled(Card)`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const UserName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserMeta = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const UserBio = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin: 0 0 10px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const UserFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LastSeen = styled.span`
  font-size: 12px;
  color: ${props => props.theme.textTertiary};
`;

const ChatButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 20px;
  background: ${props => props.theme.gradient};
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px ${props => props.theme.shadowStrong};

  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.textSecondary};
  
  div:first-child {
    font-size: 48px;
    margin-bottom: 12px;
  }
`;

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('전체');
  const [genderFilter, setGenderFilter] = useState('all');
  const [realUsers, setRealUsers] = useState([]); // 실제 DB 사용자
  const [loading, setLoading] = useState(false);

  // 실제 사용자 목록 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        console.log('🔄 사용자 목록 요청 중...');
        const response = await getUsers();
        console.log('📦 API 응답 전체:', response);
        
        // 응답이 실패했으면 스킵
        if (response.success === false) {
          console.warn('⚠️ API 호출 실패, 실제 사용자 없음');
          setRealUsers([]);
          return;
        }
        
        // API 응답 형태에 따라 처리
        const users = response.users || response || [];
        console.log('👥 파싱된 사용자 목록:', users);
        
        if (!Array.isArray(users)) {
          console.error('❌ users가 배열이 아닙니다:', typeof users);
          setRealUsers([]);
          return;
        }
        
        // DB 사용자를 HomePage 형태로 변환
        const formattedUsers = users.map(user => {
          console.log('👤 사용자 변환:', user);
          
          // profile_images 배열에서 is_primary인 이미지 찾기
          let profileImageUrl = '😊'; // 기본값
          
          if (user.profile_images && Array.isArray(user.profile_images)) {
            const primaryImage = user.profile_images.find(img => img.is_primary === true);
            if (primaryImage && primaryImage.file && primaryImage.file.file_path) {
              // API 서버의 기본 URL과 file_path 결합
              profileImageUrl = `${BASE_URL}/${primaryImage.file.file_path}`;
              console.log('🖼️ Primary 이미지 찾음:', profileImageUrl);
            } else {
              // primary 이미지가 없으면 첫 번째 이미지 사용
              const firstImage = user.profile_images[0];
              if (firstImage && firstImage.file && firstImage.file.file_path) {
                profileImageUrl = `${BASE_URL}/${firstImage.file.file_path}`;
                console.log('🖼️ 첫 번째 이미지 사용:', profileImageUrl);
              } else if (user.avatar) {
                profileImageUrl = user.avatar;
              }
            }
          } else if (user.avatar) {
            profileImageUrl = user.avatar;
          }
          
          return {
            id: user.id || user.uid,
            avatar: profileImageUrl,
            nickname: user.nickname || '익명',
            age: user.age || 0,
            gender: user.gender === 'male' ? '남성' : user.gender === 'female' ? '여성' : '기타',
            region: user.region || '미정',
            bio: user.bio || '안녕하세요!',
            online: true, // DB에서 온라인 상태는 별도 로직 필요
            lastSeen: '방금 전',
            isRealUser: true, // 실제 사용자 표시
          };
        });
        
        console.log('✅ 최종 변환된 사용자:', formattedUsers);
        setRealUsers(formattedUsers);
      } catch (error) {
        console.error('❌ 사용자 목록 로드 실패:', error);
        setRealUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Mock 사용자와 실제 사용자 합치기 (Mock이 먼저, 실제 사용자가 뒤에)
  const allUsers = [...mockUsers, ...realUsers];

  const filteredUsers = allUsers.filter(user => {
    const matchSearch = user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAge = ageFilter === 'all' || 
                    (ageFilter === '20s' && user.age >= 20 && user.age < 30) ||
                    (ageFilter === '30s' && user.age >= 30 && user.age < 40);
    const matchRegion = regionFilter === '전체' || user.region === regionFilter;
    const matchGender = genderFilter === 'all' || user.gender === genderFilter;

    return matchSearch && matchAge && matchRegion && matchGender;
  });

  const onlineCount = allUsers.filter(u => u.online).length;

  return (
    <Container>
      <Header>
        <Title>참여중인 사용자 💕</Title>
        <Subtitle>마음에 드는 사람에게 대화를 걸어보세요</Subtitle>
        
        <OnlineIndicator>
          <OnlineDot />
          <OnlineText>
            현재 <strong>{onlineCount}명</strong>이 온라인입니다
          </OnlineText>
        </OnlineIndicator>

        <InputWrapper style={{ marginBottom: '16px' }}>
          <InputIcon>🔍</InputIcon>
          <SearchInput
            type="text"
            placeholder="닉네임이나 소개글로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            $hasIcon
          />
        </InputWrapper>
      </Header>

      <FilterSection>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>나이</FilterLabel>
            <Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
              <option value="all">전체</option>
              <option value="20s">20대</option>
              <option value="30s">30대</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>지역</FilterLabel>
            <Select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>성별</FilterLabel>
            <Select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
              <option value="all">전체</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </Select>
          </FilterGroup>
        </FilterGrid>
      </FilterSection>

      <UserList>
        {loading && realUsers.length === 0 && (
          <EmptyState>
            <div>⏳</div>
            <div>사용자 목록을 불러오는 중...</div>
          </EmptyState>
        )}
        
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.id} $clickable>
              <Avatar $size="64px" $online={user.online}>
                {user.isRealUser && user.avatar && user.avatar.startsWith('http') ? (
                  <img src={user.avatar} alt={user.nickname} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  user.avatar
                )}
              </Avatar>
              <UserInfo>
                <UserHeader>
                  <UserName>{user.nickname}</UserName>
                  {user.isRealUser && <Badge $variant="primary">NEW</Badge>}
                </UserHeader>
                <UserMeta>
                  <Badge>{user.age}세</Badge>
                  <Badge>{user.gender}</Badge>
                  <Badge>{user.region}</Badge>
                </UserMeta>
                <UserBio>{user.bio}</UserBio>
                <UserFooter>
                  <LastSeen>{user.lastSeen}</LastSeen>
                  <ChatButton>대화하기 💬</ChatButton>
                </UserFooter>
              </UserInfo>
            </UserCard>
          ))
        ) : (
          !loading && (
            <EmptyState>
              <div>🔍</div>
              <div>검색 결과가 없습니다</div>
            </EmptyState>
          )
        )}
      </UserList>
    </Container>
  );
}

export default HomePage;
