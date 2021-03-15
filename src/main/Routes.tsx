import { BrowserRouter, Route } from 'react-router-dom';

import Intro from '../pages/Intro';

import { ContextProvider } from '../contexts/ContextProvider';

import { Container } from '../styles/main/Routes.module';
import { CommitContextProvider } from '../contexts/CommitContextProvider';
import React from 'react';

function Routes() {
  return (
    <Container>
              {/* <header>
          <h1>TEste</h1>
        </header> */}
      <BrowserRouter>
        <ContextProvider>
          <CommitContextProvider>
            <Route path="/" component={Intro}/> 
          </CommitContextProvider>
        </ContextProvider>
      </BrowserRouter>
    </Container>
  )
}

export default Routes;