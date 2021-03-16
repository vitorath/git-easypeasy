import React, { ReactNode, useCallback, useImperativeHandle, useState } from "react"
import { MdClose } from 'react-icons/md';

import { CloseButton, Container } from "../../styles/components/modal/Modal.styles";


type ModalProps = {
  children: ReactNode
}

export type ModalRefType = {
  openModal: () => void
  closeModal: () => void
}


export const Modal = React.forwardRef<ModalRefType, ModalProps>(({ children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <div>
        {children}
        <CloseButton 
          onClick={closeModal}
          type="button"
        >
          <MdClose size={16} color="#FFF"/>
        </CloseButton>
      </div>
    </Container>
  )
})