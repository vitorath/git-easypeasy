import React, { useMemo } from "react"
import { Commit } from "../contexts/CommitContextProvider"
import { Container } from "../styles/components/CommitItem.styles"

type FileItemParams= {
  commit: Commit;
  repository: 'LOCAL' | 'REMOTE'
}

export const CommitItem: React.FC<FileItemParams> = ({ commit, repository}) => {

  const isLocalRepository = useMemo(() => {
    return repository === 'LOCAL'
  }, [repository])

  const getRemotecommitStatus = useMemo(() => {
    if (repository === 'REMOTE' && commit.isRemote && commit.wasFetched && !commit.isLocal) {
      return 'HAS_ONLY_REPOSITORY_AND_WAS_FETCHED';
    } else if (repository === 'REMOTE' && commit.isRemote && !commit.isLocal) {
      return 'HAS_ONLY_REPOSITORY';
    } else {
      return 'DEFAULT';
    }
  }, [repository, commit.isRemote, commit.wasFetched, commit.isLocal])

  return (
    <Container 
      isCenter={!isLocalRepository} 
      status={getRemotecommitStatus}
    >
      <span>{commit.id}</span>
      {isLocalRepository ?  <p>{commit.message}</p> : null}
    </Container>
  )
}