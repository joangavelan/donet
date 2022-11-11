import { Modal } from '@/components/Elements'
import { Icon, useDisclosure, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CreateBoardForm } from './CreateBoardForm'

export const CreateBoardIcon = () => {
  const { isOpen, onOpen: openCreateBoardForm, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <Icon
        as={AiOutlinePlusCircle}
        color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
        boxSize={4}
        cursor='pointer'
        _hover={{ color: 'orange.400' }}
        title='new board'
        onClick={openCreateBoardForm}
      />

      <Modal title='New Board' isOpen={isOpen} onClose={onClose}>
        <CreateBoardForm closeModal={onClose} />
      </Modal>
    </React.Fragment>
  )
}
