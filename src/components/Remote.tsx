import React, { useContext, useMemo } from "react"
import { CommitContext } from "../contexts/CommitContextProvider"
import { Button } from "../styles/components/Button.styles"
import { Container, Footer, Header } from "../styles/components/Container.styles"
import { BodyPanelList, HeaderPanel, Panel } from "../styles/components/Panel.styles"
import { CommitItem } from "./CommitItem"


export const Remote: React.FC = () => {
  const { commits, createSimulatedCommit, doFetch } = useContext(CommitContext);

  const canNotFetch = useMemo((): boolean => {
    return commits.filter(commit => !commit.isLocal && commit.isRemote && !commit.wasFetched).length === 0
  }, [commits])

  return (
    <Container wrap={2}>
      <Header>
        <h3>Remote</h3>
      </Header>
      <Panel background="#9296b8">
        <HeaderPanel justifyContent="center">
          <Button 
            type="button"
            size="small"  
            background="#3A3EA7"
            disabled={canNotFetch}
            onClick={doFetch}
          >
            Fetch
          </Button>
        </HeaderPanel>
        <BodyPanelList direction="column-reverse">
          {commits.filter(commit => commit.isRemote)
            .map(commit => (
              <CommitItem repository="REMOTE" key={commit.id} commit={commit} />
            ))}
        </BodyPanelList>
      </Panel>
      <Footer>
        <Button 
          type="button"
          size="big"
          background="#3A3EA7"
          onClick={createSimulatedCommit}
        >
          Simulate Commit
        </Button>
      </Footer>
    </Container>
  )
}