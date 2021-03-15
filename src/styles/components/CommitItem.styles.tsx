import styled from 'styled-components';

type ContainerParam = {
  isCenter?: boolean
  selected?: boolean
  status: 'HAS_ONLY_REPOSITORY_AND_WAS_FETCHED' | 'HAS_ONLY_REPOSITORY' | 'DEFAULT'
}

const containerBackgroundColors = {
  HAS_ONLY_REPOSITORY_AND_WAS_FETCHED: '#bfc1fa',
  HAS_ONLY_REPOSITORY: '#F1A6A6',
  DEFAULT: '#FEFEFE'
}

export const Container =  styled.li<ContainerParam>`
  list-style: none;
  padding: 3px 4px;

  background-color: ${(props) => containerBackgroundColors[props.status]};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(108, 108, 108, 0.05);

  display: flex;
  justify-content: ${(props) => props.isCenter ? 'center' : 'space-around'};
  align-items: center;

  cursor: pointer;

  opacity: ${(props) => props.selected ? 0.56 : 1.0};

  & + li {
    margin-bottom: 4px;
  }

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  span {
    margin-right: 8px;
    margin-left: 4px;
    color: black;
    font-weight: 500;
  }

  :hover {
    box-shadow: 4px 4px 4px rgba(108, 108, 108, 0.25);
  }
`