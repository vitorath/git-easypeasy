import React from "react"
import { Button } from "../../styles/components/Button.styles";
import { Form } from "../../styles/components/modal/NewFileModal.styles";
import { Modal, ModalRefType } from "./Modal";


type CommitModalParams= {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

// TODO : Finish design
export const CommitModal = React.forwardRef<ModalRefType, CommitModalParams>((props, ref) => {
return (
    <Modal ref={ref}>
      <Form onSubmit={props.onSubmit}>
        {/* <label htmlFor="filename"> */}
          {/* <span>Nome do arquivo</span> */}
          <input 
            id="message" 
            name="message" 
            type="text" 
            maxLength={100} 
          />
        {/* </label> */}
        <Button size="big" background="#3AA752">Finalizar</Button>
      </Form>
    </Modal>
  )
});