import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 15px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.shadow};
  }

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`;

export const SearchInput = styled(Input)`
  padding-left: ${props => props.$hasIcon ? '44px' : '16px'};
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: ${props => props.theme.textTertiary};
  pointer-events: none;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;
