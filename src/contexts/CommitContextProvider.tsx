import { createContext, useContext, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import produce from 'immer';

import { Context } from './ContextProvider';

export type Commit = {
  id: string,
  message: string,
  selected: boolean,
  isRemote: boolean,
  isLocal: boolean,
  wasFetched: boolean,
  order: number
}

type CommitContextParams = {
  commits: Commit[]
  setSelectedCommit: (commitId: string) => void
  createCommit: (message: string) => void
  createCommitAmend: () => void
  createSimulatedCommit: () => void
  doPush: () => void
  doForcePush: () => void
  doFetch: () => void
  doPull: () => void
}


function sortRule(commitA: Commit, commitB: Commit) {
    if (commitA.order < commitB.order) {
      return -1;
    } else if (commitA.order > commitB.order) {
      return 1;
    } else {
      return 0;
    }
}

function makeCommitId(): string {
  return uuid4().slice(0, 5)
}


export const CommitContext = createContext({} as CommitContextParams);


export const CommitContextProvider: React.FC = ({ children }) => {
  const { updateCommitsInFile } = useContext(Context);

  const [commits, setCommits] = useState<Commit[]>([])
  const [order, setOrder] = useState<number>(0);

  function setSelectedCommit(commitId: string): void {
    const updatedCommits = commits.map(commit => {
      const newCommit = { ...commit };

      newCommit.selected = false;

      if (newCommit.id === commitId) {
        newCommit.selected = !commit.selected;
      }

      return newCommit;
    });

    setCommits(updatedCommits);
  }

  function createCommit(message: string): void {
    const commitId = makeCommitId();
    const newOrder = order + 1;
    const updatedCommits = produce(commits, (draft) => {
      draft.push({
        id: commitId,
        message,
        selected: false,
        isRemote: false,
        isLocal: true,
        wasFetched: true,
        order: newOrder,
      });
      draft.sort(sortRule);
    })

    setCommits(updatedCommits);
    setOrder(newOrder);

    updateCommitsInFile(commitId);
  }

  function createCommitAmend(): void {
    if (commits.length === 0) {
      return;
    }
    
    const commitId = commits[commits.length - 1].id;
    updateCommitsInFile(commitId);
  }

  function createSimulatedCommit(): void {
    const newOrder = order + 1;
    const updatedCommits = produce(commits, (draft) => {
      draft.push({
        id: makeCommitId(),
        message: 'Auto Commit ',
        selected: false,
        isRemote: true,
        isLocal: false,
        wasFetched: false,
        order: newOrder
      });

      draft.sort(sortRule);
    })

    setCommits(updatedCommits);

    setOrder(newOrder)
  }

  function doForcePush(): void {
    
    const updatedCommits = commits.filter(commit => 
      (!commit.isRemote && commit.isLocal) || 
      (commit.isRemote && commit.isLocal)
    ).map((commit) => {
      const newCommit = {...commit };
      if (!commit.isRemote && commit.isLocal) {
        newCommit.isRemote = true;
        newCommit.wasFetched = true;
      }
      return newCommit;
    }).sort(sortRule);

    setCommits(updatedCommits);
  }

  function doPush(): void {
    const updatedCommits = produce(commits, draft => {
      draft.forEach((commit) => {
        if (!commit.isRemote && commit.isLocal) {
          commit.isRemote = true;
        }
      });
      draft.sort(sortRule);
    });

    setCommits(updatedCommits);
  }

  function doFetch(): void {
    const updatedCommits = produce(commits, draft => {
      draft.forEach((commit) => {
        if (!commit.isLocal && commit.isRemote && !commit.wasFetched) {
          commit.wasFetched = true;
        }
      });
      draft.sort(sortRule);
    });

    setCommits(updatedCommits);
  }

  function hasCommitsOnlyInRemote(): boolean {
    return commits.filter(commit => !commit.isLocal && commit.isRemote).length > 0;
  }
  function hasCommitsOnlyInLocal(): boolean {
    return commits.filter(commit => commit.isLocal && !commit.isRemote).length > 0;
  }

  function doPull(): void {
      const newOrder = order + 1;
      const updatedCommits = produce(commits, draft => {
        if (hasCommitsOnlyInRemote() && hasCommitsOnlyInLocal()) {

          draft.forEach((commit) => {
            if (!commit.isLocal && commit.isRemote && commit.wasFetched) {
              commit.isLocal = true;
            }
          });

          draft.push({
            id: makeCommitId(),
            message: 'Merge Remote to Local',
            selected: false,
            isRemote: false,
            isLocal: true,
            wasFetched: true,
            order: newOrder
          })

        } else {
          draft.forEach((commit) => {
            if (!commit.isLocal && commit.isRemote && commit.wasFetched) {
              commit.isLocal = true;
            }
          });
        }

        draft.sort(sortRule)
      });
    setCommits(updatedCommits);
  }

  return ( 
    <CommitContext.Provider value={{
      commits,
      setSelectedCommit,
      createCommit,
      createCommitAmend,
      createSimulatedCommit,
      doPush,
      doForcePush,
      doFetch,
      doPull
    }}>
      {children}
    </CommitContext.Provider>
  )
}



