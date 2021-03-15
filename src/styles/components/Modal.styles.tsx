import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  height: 100%;
  width: 100vw;

  > div {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 24%;
    
    padding: 36px 8px 24px 8px;

    background-color: #FEFEFE;
    min-width: 264px;
    max-width: 540px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  background-color: #BB1E1E;
  margin: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  border: none;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: opacity 0.2s;

  :hover {
    opacity: 0.64;
  }
`;