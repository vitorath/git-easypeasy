import React, { useCallback, useContext, useMemo, useRef } from "react"

import { Context } from "../contexts/ContextProvider"

import { FileItem } from "./FileItem"

import { Button, ButtonGroup } from "../styles/components/Button.styles"
import { Container, Footer, Header } from "../styles/components/Container.styles"
import { BodyPanelList, FooterPanel, HeaderPanel, Panel, PanelGroup } from "../styles/components/Panel.styles"
import { ModalRefType } from "./Modal"
import { NewFileModal } from "./NewFileModal"
import { CommitContext } from "../contexts/CommitContextProvider"
import { CommitModal } from "./CommitModal"


export const Workspace: React.FC = () => {
  const newFileModalRef = useRef<ModalRefType>(null)
  const commitModalRef = useRef<ModalRefType>(null)

  const { 
    files, 
    addNewFile, 
    addAllFilesToStaged, 
    addAllFilesToUnstaged, 
    addSelectedFilesToStaged, 
    addSelectedFilesToUnstaged 
  } = useContext(Context);

  const {
    commits,
    createCommit,
    createCommitAmend
  } = useContext(CommitContext);

  const openNewFileModal = useCallback(() => {
    newFileModalRef.current?.openModal();
  }, [])

  const openCommitModal = useCallback(() => {
    commitModalRef.current?.openModal();
  }, [])

  function submitNewFileModal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const filename = data.get("filename") as string;
    if (!filename) {
     console.log('error');
    }

    addNewFile(filename);

    e.currentTarget.reset();
    newFileModalRef.current?.closeModal();
  }

  function submitCommitModal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const filename = data.get("message") as string;
    if (!filename) {
     console.log('error');
    }

    createCommit(filename);

    e.currentTarget.reset();
    commitModalRef.current?.closeModal();
  }

  const isDisableStageSelected = useMemo(() => {
    return files.filter(file => file.selectedUnstaged && file.unstaged).length === 0;
  }, [files]);

  const isDisableUnstageSelected = useMemo(() => {
    return files.filter(file => file.selectedStaged && file.staged).length === 0;
  }, [files])

  const isDisableStageAll = useMemo(() => {
    return files.filter(file => file.unstaged).length === 0;
  }, [files]);

  const isDisableUnstageAllOrCommit = useMemo(() => {
    return files.filter(file => file.staged).length === 0;
  }, [files]) 

  const isDisbaledCommitAmend = useMemo(() => {
    return !(commits.filter(commit => commit.isLocal).length > 0 && !isDisableUnstageAllOrCommit);
  }, [commits, isDisableUnstageAllOrCommit])

  return (
    <>
      <Container wrap={3}>
        <Header>
          <h3>Workspace</h3>
        </Header>
        <PanelGroup>
          <Panel background="#B7DEB6">
            <HeaderPanel>
              <span>Staged</span>
              <ButtonGroup>
                <Button 
                  type="button"
                  size="small" 
                  background="#034912"
                  disabled={isDisbaledCommitAmend}
                  onClick={createCommitAmend}
                >
                  Commit Amend
                </Button>
                <Button 
                  type="button"
                  size="small" 
                  background="#3AA752"
                  disabled={isDisableUnstageAllOrCommit}
                  onClick={openCommitModal}
                >
                  Commit
                </Button>
              </ButtonGroup>
            </HeaderPanel>
            <BodyPanelList maxHeight="209px">
              {files.filter(file => file.staged && !file.commited).map((file, index) => (
                <FileItem
                  key={file.id} 
                  file={file} 
                  type="STAGED"
                />
              ))}
            </BodyPanelList>
            <FooterPanel>
              <ButtonGroup>
                <Button 
                  type="button"
                  size="small"  
                  background="#BB1E1E"
                  disabled={isDisableUnstageAllOrCommit}
                  onClick={addAllFilesToUnstaged}
                >
                  Unstaged All
                </Button>
                <Button 
                  type="button"
                  size="small"  
                  background="#F1A6A6" 
                  color="#4b0000"
                  disabled={isDisableUnstageSelected}
                  onClick={addSelectedFilesToUnstaged}
                >
                  Unstaged Selected
                </Button>
              </ButtonGroup>
            </FooterPanel>
          </Panel>
          <Panel background="#F1A6A6">
            <HeaderPanel>
              <span>Unstaged</span>
              <ButtonGroup>
                <Button 
                  type="button"
                  size="small" 
                  background="#3AA752"
                  disabled={isDisableStageAll}
                  onClick={addAllFilesToStaged}
                >
                  Stage All
                </Button>
                <Button 
                  type="button"
                  size="small" 
                  background="#B7DEB6" 
                  color="#003f0e"
                  disabled={isDisableStageSelected}
                  onClick={addSelectedFilesToStaged}
                >
                  Stage Selected
                </Button>
              </ButtonGroup>
            </HeaderPanel>
            <BodyPanelList maxHeight="209px">
              {files.filter(file => file.unstaged && !file.commited).map((file, index) => (
                <FileItem 
                  key={file.id} 
                  file={file} 
                  type="UNSTAGED"
                />
              ))}
            </BodyPanelList>
          </Panel>
        </PanelGroup>
        <Footer>
          <Button 
            size="big" 
            background="#3AA752"
            onClick={openNewFileModal}
          >
            Simulate File
          </Button>
        </Footer>
      </Container>
      <NewFileModal 
        ref={newFileModalRef} 
        onSubmit={submitNewFileModal} 
      />
      <CommitModal 
        ref={commitModalRef}
        onSubmit={submitCommitModal}
      />
    </>
  )
}