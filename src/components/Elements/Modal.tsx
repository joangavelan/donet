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
  topPosition?: string | number
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  topPosition = '20%'
}: ModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent top={topPosition} pb={4} pt={title ? 0 : 4}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  )
}
