import { useState } from 'react';
import styled from 'styled-components';
import { mockFeeds } from '../data/mockData';
import { Card, Avatar } from '../components/common/Card.styled';
import { IconButton } from '../components/common/Button.styled';

const Container = styled.div`
  padding: 20px 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const CreateButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px ${props => props.theme.shadowStrong};

  &:active {
    transform: scale(0.9);
  }
`;

const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FeedCard = styled(Card)`
  padding: 20px;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 2px;
`;

const PostTime = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textTertiary};
`;

const FeedContent = styled.div`
  font-size: 15px;
  color: ${props => props.theme.text};
  line-height: 1.6;
  margin-bottom: 14px;
  word-break: break-word;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => {
    const count = props.$count;
    if (count === 1) return '1fr';
    if (count === 2) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  }};
  gap: 8px;
  margin-bottom: 14px;
`;

const ImageBox = styled.div`
  aspect-ratio: 1;
  background: ${props => props.theme.gradient};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
`;

const FeedActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid ${props => props.theme.border};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.$active ? props.theme.gradientAlt : props.theme.inputBg};
  color: ${props => props.$active ? 'white' : props.theme.textSecondary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const ActionIcon = styled.span`
  font-size: 18px;
`;

const ActionCount = styled.span`
  font-size: 13px;
`;

const WriteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const WriteContent = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${props => props.theme.cardBg};
  border-radius: 24px 24px 0 0;
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
`;

const WriteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const WriteTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin: 0;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.textSecondary};
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.9);
  }
`;

const WriteTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 16px;
  background: ${props => props.theme.gradient};
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

function List2Page() {
  const [feeds, setFeeds] = useState(mockFeeds);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [writeContent, setWriteContent] = useState('');

  const toggleLike = (feedId) => {
    setFeeds(feeds.map(feed => {
      if (feed.id === feedId) {
        return {
          ...feed,
          isLiked: !feed.isLiked,
          likes: feed.isLiked ? feed.likes - 1 : feed.likes + 1,
        };
      }
      return feed;
    }));
  };

  const handleSubmitPost = () => {
    if (writeContent.trim()) {
      alert('게시글이 작성되었습니다! ✨');
      setWriteContent('');
      setShowWriteModal(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>일상 피드 ✨</Title>
        <CreateButton onClick={() => setShowWriteModal(true)}>
          ✏️
        </CreateButton>
      </Header>

      <FeedList>
        {feeds.map(feed => (
          <FeedCard key={feed.id}>
            <FeedHeader>
              <Avatar $size="44px">
                {feed.author.avatar}
              </Avatar>
              <AuthorInfo>
                <AuthorName>{feed.author.nickname}</AuthorName>
                <PostTime>{feed.timeAgo}</PostTime>
              </AuthorInfo>
            </FeedHeader>

            <FeedContent>{feed.content}</FeedContent>

            {feed.images.length > 0 && (
              <ImageGrid $count={feed.images.length}>
                {feed.images.map((img, idx) => (
                  <ImageBox key={idx}>{img}</ImageBox>
                ))}
              </ImageGrid>
            )}

            <FeedActions>
              <ActionButton 
                $active={feed.isLiked}
                onClick={() => toggleLike(feed.id)}
              >
                <ActionIcon>{feed.isLiked ? '❤️' : '🤍'}</ActionIcon>
                <ActionCount>{feed.likes}</ActionCount>
              </ActionButton>
              <ActionButton>
                <ActionIcon>💬</ActionIcon>
                <ActionCount>{feed.comments}</ActionCount>
              </ActionButton>
              <ActionButton>
                <ActionIcon>🔗</ActionIcon>
              </ActionButton>
            </FeedActions>
          </FeedCard>
        ))}
      </FeedList>

      {showWriteModal && (
        <WriteModal onClick={() => setShowWriteModal(false)}>
          <WriteContent onClick={(e) => e.stopPropagation()}>
            <WriteHeader>
              <WriteTitle>새 게시글 작성</WriteTitle>
              <CloseButton onClick={() => setShowWriteModal(false)}>
                ✕
              </CloseButton>
            </WriteHeader>
            <WriteTextarea
              placeholder="무슨 생각을 하고 계신가요? 😊"
              value={writeContent}
              onChange={(e) => setWriteContent(e.target.value)}
            />
            <SubmitButton onClick={handleSubmitPost}>
              게시하기 🚀
            </SubmitButton>
          </WriteContent>
        </WriteModal>
      )}
    </Container>
  );
}

export default List2Page;
