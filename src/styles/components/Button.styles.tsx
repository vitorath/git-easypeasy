import styled from 'styled-components';


type ButtonParams = {
  background: string
  color?: string
  size: 'small' | 'big'
}

export const ButtonGroup = styled.div`
  button:not(:last-child){
    margin-right:8px;
  }
`;

export const Button = styled.button`
  cursor: pointer;

  padding: ${({ size }: ButtonParams) => size === 'small' ? '4px': '4px 8px'};
  min-width: ${({ size }: ButtonParams) => size === 'small' ? '4rem': '8rem'};

  font-size: ${({ size }: ButtonParams) => size === 'small' ? '0.8rem': '1rem'};

  border: none;
  border-radius: 4px;

  outline: none;

  background-color: ${({ background }: ButtonParams) => background};
  color: ${({ color }: ButtonParams) => color ? color : '#FFF' };

  transition: opacity 0.2s;

  :hover {
    opacity: 0.64;
  }

  :disabled {
    cursor: default;
    opacity: 0.36
  }
`;