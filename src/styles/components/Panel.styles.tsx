import styled from 'styled-components';

type PanelParams = {
  background: string
}

type HeaderPanelProps = {
  justifyContent?: string
}

type BodyPanelListParam = {
  maxHeight?: string
  direction?: 'column-reverse' | 'column'
}

export const Panel = styled.div`
  height: 100%;
  
  padding: 8px; 

  border-radius: 4px;
  box-shadow: 4px 4px 8px #78787886;

  background-color: ${({ background }: PanelParams) => background };

  display: flex;
  flex-direction: column;
`;

export const HeaderPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }: HeaderPanelProps) => justifyContent ? justifyContent : 'space-between'};
`;

export const BodyPanelList = styled.ul<BodyPanelListParam>`
  flex: 1;
  overflow-y: auto;

  margin: 8px 0px;
  max-height: ${(props) => props.maxHeight ? props.maxHeight : '583px'};

  display: flex;
  flex-direction: ${(props) => props.direction ? props.direction: 'column'};
`;

export const FooterPanel = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

export const PanelGroup = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${Panel}:first-child {
    margin-bottom: 8px;
  }
`;

