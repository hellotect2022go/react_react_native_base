import styled from 'styled-components';

// 이 파일은 이제 사용되지 않습니다.
// 새로운 구조에서는 각 페이지가 자체 스타일을 가지고 있습니다.
// 
// 페이지별 스타일 위치:
// - HomePage.jsx (내부에 styled-components 포함)
// - ListPage.jsx (내부에 styled-components 포함)
// - List2Page.jsx (내부에 styled-components 포함)
// - SettingsPage.jsx (내부에 styled-components 포함)
// - MainLayout.styled.js (레이아웃 스타일)

// 필요시 공통 스타일 컴포넌트를 여기에 추가할 수 있습니다.
export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
`;
