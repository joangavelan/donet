import {
  Modal as ModalContainer,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import type { SystemStyleObject } from '@chakra-ui/react'

type ModalProps = {
  title?: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  topPosition?: string | number
  sx?: SystemStyleObject
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  topPosition = '20%',
  sx
}: ModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent top={topPosition} pb={4} pt={title ? 0 : 4} sx={sx}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  )
}
