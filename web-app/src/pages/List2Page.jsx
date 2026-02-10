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
  margin: 0 0 24px 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const GridCard = styled.div`
  aspect-ratio: 1;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    opacity: 0.1;
    transition: opacity 0.2s;
  }

  &:active {
    transform: scale(0.95);

    &::before {
      opacity: 0.15;
    }
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
`;

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
`;

const CardCount = styled.div`
  font-size: 24px;
  font-weight: 700;
  background: ${props => props.$gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

function List2Page() {
  const categories = [
    {
      id: 1,
      icon: '📚',
      title: '북마크',
      count: 24,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      icon: '⭐',
      title: '즐겨찾기',
      count: 18,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 3,
      icon: '📸',
      title: '사진',
      count: 156,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      id: 4,
      icon: '🎵',
      title: '음악',
      count: 89,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      id: 5,
      icon: '🎬',
      title: '동영상',
      count: 42,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      id: 6,
      icon: '📄',
      title: '문서',
      count: 67,
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    },
    {
      id: 7,
      icon: '💼',
      title: '업무',
      count: 31,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
    {
      id: 8,
      icon: '🎯',
      title: '목표',
      count: 12,
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    },
  ];

  return (
    <Container>
      <Title>목록2</Title>
      <GridContainer>
        {categories.map(category => (
          <GridCard key={category.id} $gradient={category.gradient}>
            <CardIcon>{category.icon}</CardIcon>
            <CardTitle>{category.title}</CardTitle>
            <CardCount $gradient={category.gradient}>{category.count}</CardCount>
          </GridCard>
        ))}
      </GridContainer>
    </Container>
  );
}

export default List2Page;
