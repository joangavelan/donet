import * as React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useColorModeValue
} from '@chakra-ui/react'

type AlertProps = {
  header: React.ReactNode
  body: React.ReactNode
  confirmText?: string
  loadingAction: boolean
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const Alert = ({
  header,
  body,
  isOpen,
  onClose,
  confirmText = 'Delete',
  onConfirm,
  loadingAction
}: AlertProps) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent top='20%'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {header}
          </AlertDialogHeader>

          <AlertDialogBody color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}>
            {body}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='orange' onClick={onConfirm} isLoading={loadingAction} ml={3}>
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
