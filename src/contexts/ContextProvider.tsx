import { createContext, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import produce from 'immer';

export type FileCommit = {
  id: string
  filename: string
  commits: Array<string>
  staged: boolean
  unstaged: boolean
  selectedStaged: boolean,
  selectedUnstaged: boolean,
  commited: boolean
}

type ContextParams = {
  files: Array<FileCommit>
  addNewFile: (filename: string) => void
  handleSelectFile: (id: string, type: 'STAGED' | 'UNSTAGED') => void
  addAllFilesToStaged: () => void
  addSelectedFilesToStaged: () => void
  addAllFilesToUnstaged: () => void
  addSelectedFilesToUnstaged: () => void
  updateCommitsInFile: (commitId: string) => void
}

export const Context = createContext({} as ContextParams);

export const ContextProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<FileCommit[]>([])

  function addNewFile(filename: string): void {
    const existingFileIndex = files.findIndex(file => file.filename === filename);
    setFiles(produce(files, draft => {
      if (existingFileIndex !== -1) {
        draft[existingFileIndex].unstaged = true;
        draft[existingFileIndex].commited = false;
      } else {
        const newFile = {
          id: uuid4(),
          filename: filename,
          commits: [],
          staged: false,
          unstaged: true,
          selectedStaged: false,
          selectedUnstaged: false,
          commited: false,
        };
        draft.push(newFile);
      }
    })); 
  }

  function handleSelectFile(id: string, type: string): void {
    const updatedFiles = files.map((file) => {
      if (file.id === id) {
        return {
          ...file,
          selectedStaged: type === 'STAGED' ? !file.selectedStaged : file.selectedStaged,
          selectedUnstaged: type === 'UNSTAGED' ? !file.selectedUnstaged : file.selectedUnstaged
        }
      } else {
        return file;
      }
    });

    setFiles(updatedFiles);
  }

  function addAllFilesToStaged(): void {
    const updatedFiles = files.map((file) => {
      if (file.unstaged && !file.commited) {
        return {
          ...file,
          selectedUnstaged: false,
          staged: true,
          unstaged: false
        }
      } else {
        return file;
      }
    });

    setFiles(updatedFiles);
  }

  function addSelectedFilesToStaged(): void {
    const updatedFiles = files.map((file) => {
      if (file.selectedUnstaged) {
        return {
          ...file,
          selectedUnstaged: false,
          staged: true,
          unstaged: false
        }
      } else {
        return file;
      }
    });

    setFiles(updatedFiles);
  }

  function addAllFilesToUnstaged(): void {
    const updatedFiles = files.map((file) => {
      if (file.staged && !file.commited) {
        return {
          ...file,
          selectedStaged: false,
          staged: false,
          unstaged: true
        }
      } else {
        return file;
      }
    });

    setFiles(updatedFiles);
  }

  function addSelectedFilesToUnstaged(): void {
    const updatedFiles = files.map((file) => {
      if (file.selectedStaged) {
        return {
          ...file,
          selectedStaged: false,
          staged: false,
          unstaged: true
        };
      } else {
        return file;
      }
    });

    setFiles(updatedFiles);
  }

  function updateCommitsInFile(commitId: string): void {
    const updatedFiles = files.map(file => {
      if (file.staged && !file.commited) {
        return {
          ...file,
          staged: false,
          selectedStaged: false,
          commited: true,
          commits: produce(file.commits, draft => {
            draft.push(commitId);
          })
        }
      } else {
        return file;
      }
    });

    setFiles(updatedFiles);
  }

  return (
    <Context.Provider value={{ 
      files,
      addNewFile,
      handleSelectFile,
      addAllFilesToStaged,
      addSelectedFilesToStaged,
      addAllFilesToUnstaged,
      addSelectedFilesToUnstaged,
      updateCommitsInFile
    }}>
      {children}
    </Context.Provider>
  )
}