import React from "react";
import { Local } from "../components/Local";
import { Remote } from "../components/Remote";
import { Workspace } from "../components/Worspace";
import { Container } from "../styles/pages/Intro.styles";

function Intro() {
  return (
    <Container>
      <Workspace />
      <Local />
      <Remote />
    </Container>
  );
}

export default Intro;