import React, { useContext, useMemo } from "react"
import { CommitContext } from "../contexts/CommitContextProvider"
import { Button, ButtonGroup } from "../styles/components/Button.styles"
import { Container, Header } from "../styles/components/Container.styles"
import { BodyPanelList, HeaderPanel, Panel } from "../styles/components/Panel.styles"
import { CommitItem } from "./CommitItem"


export const Local: React.FC = () => {
  const { commits, doPush, doForcePush, doPull } = useContext(CommitContext);

  function canNotPull(): boolean {
    return commits.filter(commit => !commit.isLocal && commit.isRemote && commit.wasFetched).length === 0;
  }

  function canNotPush(): boolean {
    const totalRemoteCommits = commits.filter(commit => !commit.isLocal && commit.isRemote).length;
    return totalRemoteCommits > 0 || commits.length === 0;
  }

  function canNotForcePush(): boolean {
    return commits.filter(commit => commit.isLocal).length === 0;
  }

  const isCommitsSelected = useMemo(() => {
    return commits.filter(commit => commit.selected && commit.isLocal).length > 0;
  }, [commits])

  return (
    <Container wrap={3}>
        <Header>
          <h3>Local</h3>
          <Button 
            type="button"
            size="small" 
            style={{ marginLeft: '8px' }}
            background="#BB1E1E"
            disabled={canNotForcePush()}
            onClick={doForcePush}
          >
            Force Push
          </Button>
        </Header>
        <Panel background="#DEDEDE">
          <HeaderPanel justifyContent="center">
            {isCommitsSelected ? (
              <ButtonGroup>
                <Button size="small"  background="#BB1E1E">Revert</Button>
                <Button size="small"  background="#F1A6A6" color="#4b0000">Reset</Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button 
                  type="button"
                  size="small"  
                  background="#1F7EA7"
                  disabled={canNotPull()}
                  onClick={doPull}
                >
                  Pull
                </Button>
                <Button 
                  type="button"
                  size="small"  
                  background="#3AA752"
                  disabled={canNotPush()}
                  onClick={doPush}
                >
                  Push
                </Button>
              </ButtonGroup>
            )}
          </HeaderPanel>
          <BodyPanelList direction="column-reverse">
            {commits.filter(commit => commit.isLocal)
              .map(commit => (
                <CommitItem repository="LOCAL" key={commit.id} commit={commit} />
              ))}
          </BodyPanelList>
        </Panel>
      </Container>
  )
}