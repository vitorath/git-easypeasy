import React from "react"
import { Modal, ModalRefType } from "./Modal";
import { Button } from "../../styles/components/Button.styles";
import { Form } from "../../styles/components/modal/NewFileModal.styles";


type NewFileModalParams= {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}


// TODO : Finish design
export const NewFileModal = React.forwardRef<ModalRefType, NewFileModalParams>((props, ref) => {
return (
    <Modal ref={ref}>
      <Form onSubmit={props.onSubmit}>
        {/* <label htmlFor="filename"> */}
          {/* <span>Nome do arquivo</span> */}
          <input 
            id="filename" 
            name="filename" 
            type="text" 
            maxLength={100} 
          />
        {/* </label> */}
        <Button size="big" background="#3AA752">Criar</Button>
      </Form>
    </Modal>
  )
});