import styled from '@emotion/styled';
import * as Polished from 'polished';

const Button = styled.div<{ color: string; width?: string }>`
  width: ${(props) => props?.width ?? '240px'};
  max-width: ${(props) => props?.width ?? '460px'};
  height: 46px;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  margin-right: 16px;
  margin-bottom: 16px;

  &:hover {
    cursor: ${(props) => (props.onClick ? 'pointer' : null)};
    background-color: ${(props) => (props.onClick ? Polished.darken(0.05, props.color) : null)};
  }

  &:active {
    background-color: ${(props) => (props.onClick ? Polished.darken(0.1, props.color) : null)};
  }
`;

export default Button;