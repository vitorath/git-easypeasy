import styled from 'styled-components';

type ContainerParams = {
  wrap: number
  maxHeight?: string
}

export const Container = styled.div<ContainerParams>`
  width: 100%;

  margin: 1.5rem;

  flex: ${(props) => props.wrap};
  max-width: 270px;
`;

export const Header = styled.div`
  margin-bottom: 4px;

  display: flex;
  justify-content: center;
  align-items: center; 
`;

export const Footer = styled.div`
  margin: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
