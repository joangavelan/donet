import {
  Modal as ModalContainer,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

type ModalProps = {
  title?: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent top='20%' pb={4} pt={title ? 0 : 4}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  )
}
