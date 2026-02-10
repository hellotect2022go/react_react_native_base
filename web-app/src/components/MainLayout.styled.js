import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${props => props.theme.background};
`;

export const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

export const BottomNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${props => props.theme.headerBg};
  backdrop-filter: blur(10px);
  border-top: 1px solid ${props => props.theme.border};
  padding: 8px 0 max(8px, env(safe-area-inset-bottom));
  box-shadow: 0 -2px 16px ${props => props.theme.shadow};
`;

export const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  min-width: 64px;

  &:active {
    transform: scale(0.95);
  }
`;

export const NavIcon = styled.div`
  font-size: 24px;
  color: ${props => props.$active ? props.theme.primary : props.theme.textTertiary};
  transition: all 0.2s;
  
  svg {
    display: block;
  }
`;

export const NavLabel = styled.span`
  font-size: 12px;
  font-weight: ${props => props.$active ? '700' : '500'};
  color: ${props => props.$active ? props.theme.primary : props.theme.textTertiary};
  transition: all 0.2s;
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: ${props => props.theme.gradient};
`;
