import styled from 'styled-components';

type ContainerParam = {
  selected?: boolean
}

type StatusParam = {
  color: string
}

export const Container =  styled.li<ContainerParam>`
  list-style: none;
  padding: 3px 4px;

  background-color: #FEFEFE;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(108, 108, 108, 0.05);

  display: flex;
  justify-content: space-space-around;
  align-items: center;

  cursor: pointer;

  opacity: ${(props) => props.selected ? 0.56 : 1.0};

  & + li {
    margin-top: 4px;
  }

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  > div {
    margin-right: 8px;
    margin-left: 4px;
  }

  :hover {
    box-shadow: 4px 4px 4px rgba(108, 108, 108, 0.25);
  }
`;

export const Status = styled.span<StatusParam>`
  color: ${(props) => props.color};
  font-weight: 500;
`;