import styled from 'styled-components';

export const Card = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 20px;
  padding: ${props => props.$padding || '16px'};
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  transition: all 0.2s;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};

  ${props => props.$clickable && `
    &:active {
      transform: scale(0.98);
      box-shadow: 0 2px 8px ${props.theme.shadow};
    }
  `}
`;

export const Avatar = styled.div`
  width: ${props => props.$size || '48px'};
  height: ${props => props.$size || '48px'};
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => {
    const size = parseInt(props.$size) || 48;
    return `${size * 0.5}px`;
  }};
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 2px 8px ${props => props.theme.shadowStrong};

  ${props => props.$online && `
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: ${parseInt(props.$size || '48') * 0.25}px;
      height: ${parseInt(props.$size || '48') * 0.25}px;
      border-radius: 50%;
      background: #10B981;
      border: 2px solid ${props.theme.cardBg};
    }
  `}
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 12px;
  background: ${props => props.$variant === 'primary' 
    ? props.theme.gradient 
    : props.theme.inputBg};
  color: ${props => props.$variant === 'primary' 
    ? '#fff' 
    : props.theme.textSecondary};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;
