import * as React from 'react'
import { Modal } from '@/components/Elements'
import { Button, IconButton, useDisclosure } from '@chakra-ui/react'
import { CreateTaskForm } from './CreateTaskForm'
import { useTemplates } from '@/features/templates/hooks'
import { useBoard } from '@/features/boards/hooks'
import { useNotification } from '@/hooks'
import { TiPlus } from 'react-icons/ti'

export const CreateTaskButton = () => {
  const { isOpen, onClose, onOpen: openCreateTaskForm } = useDisclosure()
  const board = useBoard()
  const { data: templates } = useTemplates(board.id)
  const showNotification = useNotification()

  const handleCreateNewTask = () => {
    if (!templates?.length) {
      showNotification({
        type: 'warning',
        message: 'You need to create a template first'
      })
    } else {
      openCreateTaskForm()
    }
  }

  return (
    <React.Fragment>
      <Button
        colorScheme='orange'
        onClick={handleCreateNewTask}
        display={{ base: 'none', lg: 'block' }}
      >
        Add New Task
      </Button>

      <IconButton
        icon={<TiPlus />}
        onClick={handleCreateNewTask}
        aria-label='add new task'
        colorScheme='orange'
        display={{ base: 'flex', lg: 'none' }}
        size='sm'
      />

      <Modal title='Add New Task' isOpen={isOpen} onClose={onClose} topPosition='12%'>
        <CreateTaskForm templates={templates ?? []} closeModal={onClose} />
      </Modal>
    </React.Fragment>
  )
}
