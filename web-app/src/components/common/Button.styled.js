import styled from 'styled-components';

export const Button = styled.button`
  padding: ${props => props.$size === 'small' ? '8px 16px' : '12px 24px'};
  border: none;
  border-radius: 24px;
  background: ${props => props.$variant === 'outlined' 
    ? 'transparent' 
    : props.theme.gradient};
  color: ${props => props.$variant === 'outlined' 
    ? props.theme.primary 
    : '#fff'};
  border: ${props => props.$variant === 'outlined' 
    ? `2px solid ${props.theme.primary}` 
    : 'none'};
  font-size: ${props => props.$size === 'small' ? '13px' : '15px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button`
  width: ${props => props.$size === 'small' ? '36px' : '44px'};
  height: ${props => props.$size === 'small' ? '36px' : '44px'};
  border: none;
  border-radius: 50%;
  background: ${props => props.$active ? props.theme.gradient : props.theme.cardBg};
  color: ${props => props.$active ? '#fff' : props.theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$size === 'small' ? '18px' : '22px'};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};

  &:active {
    transform: scale(0.9);
  }
`;
