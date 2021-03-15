import React, { useContext, useMemo } from "react"
import { Context, FileCommit } from "../contexts/ContextProvider"
import { Container, Status } from "../styles/components/FileItem.styles"

type FileItemParams= {
  file: FileCommit;
  type: 'STAGED' | 'UNSTAGED'
}

function getStatus(file: FileCommit, type: 'STAGED' | 'UNSTAGED') {
  if (type === 'UNSTAGED' && file.unstaged && file.staged && file.commits.length === 0) {
    return {
      letterOne: {
        name: 'A',
        color: 'green'
      },
      letterTwo: {
        name: 'M',
        color: 'red'
      }
    };
  } else if (type === 'UNSTAGED' && file.unstaged && file.staged && file.commits.length > 0) {
    return {
      letterOne: {
        name: 'M',
        color: 'green'
      },
      letterTwo: {
        name: 'M',
        color: 'red'
      }
    };
  } else if (type === 'UNSTAGED' && file.unstaged && file.commits.length === 0) {
    return {
      letterOne: {
        name: '?',
        color: 'red'
      },
      letterTwo: {
        name: '?',
        color: 'red'
      }
    }
  } else if (type === 'UNSTAGED' && file.unstaged && file.commits.length > 0) {
    return {
      letterOne: {
        name: 'M',
        color: 'red'
      }
    }
  } else if (file.staged && file.commits.length === 0) {
    return {
      letterOne: {
        name: 'A',
        color: 'green'
      }
    }
  } else {
    return {
      letterOne: {
        name: 'M',
        color: 'green'
      }
    }
  }
}

export const FileItem: React.FC<FileItemParams> = ({ file, type }) => {

  const { handleSelectFile } = useContext(Context);

  function handleClick(): void {
    handleSelectFile(file.id, type);
  }

  const status = useMemo(() => {
    return getStatus(file, type);
  }, [file, type])


  const isSelected = useMemo(() => {
    const isStagedSelected = (type === 'STAGED' && file.selectedStaged);
    const isUnstagedSelected = (type === 'UNSTAGED' && file.selectedUnstaged);

    if (isStagedSelected || isUnstagedSelected) {
      return true;
    } else {
      return false;
    }
  }, [type, file.selectedStaged, file.selectedUnstaged])

  return (
    <Container onClick={handleClick} selected={isSelected}>
      <div>
        <Status color={status.letterOne.color}>{status.letterOne.name}</Status>
        {status.letterTwo && (
          <Status color={status.letterTwo.color}>{status.letterTwo.name}</Status>
        )}
      </div>
      <p>{file.filename}</p>
    </Container>
  )
}