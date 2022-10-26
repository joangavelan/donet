import { Modal } from '@/components/Elements'
import { Button, useDisclosure } from '@chakra-ui/react'
import { AddTemplateForm } from './createTemplateForm'
import * as React from 'react'

export const AddTemplate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <Button colorScheme='orange' onClick={onOpen}>
        New template
      </Button>

      <Modal title='New template' isOpen={isOpen} onClose={onClose}>
        <AddTemplateForm closeModal={onClose} />
      </Modal>
    </React.Fragment>
  )
}
