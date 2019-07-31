import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.button.attrs({
  type: 'button',
})`
  background: #7159c1;
  border: 0;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  padding: 12px 20px;
  overflow: hidden;
  text-transform: uppercase;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, '#7159c1')};
  }

  &:disabled {
    background: ${lighten(0.05, '#7159c1')};
    color: ${lighten(0.05, '#FFF')};
    cursor: default;
  }
`;
