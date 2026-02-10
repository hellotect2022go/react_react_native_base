import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f8f9fa;
`;

export const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: env(safe-area-inset-bottom);
`;

export const BottomNav = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
`;

export const NavItem = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;
  max-width: 100px;

  &:active {
    transform: scale(0.95);
  }

  ${props => props.$active && `
    transform: translateY(-2px);
  `}
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 3px 3px;
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

export const NavIcon = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${props => props.$active ? '#667eea' : '#9ca3af'};
  
  ${props => props.$active && `
    transform: scale(1.1);
    filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3));
  `}

  svg {
    display: block;
  }
`;

export const NavLabel = styled.span`
  font-size: 11px;
  font-weight: ${props => props.$active ? '600' : '500'};
  color: ${props => props.$active ? '#667eea' : '#6b7280'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  
  ${props => props.$active && `
    transform: scale(1.05);
  `}
`;
