import { Modal } from '@/components/Elements'
import { useNotification } from '@/hooks'
import type { Tasks } from '@/types'
import { MenuItem, useDisclosure } from '@chakra-ui/react'
import * as React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { useUpdateTask } from '../../hooks'
import { TaskForm } from '../TaskForm'

type EditTaskMenuItemProps = {
  task: Tasks['Row']
}

export const EditTaskMenuItem = ({ task }: EditTaskMenuItemProps) => {
  const {
    isOpen: editTaskFormIsOpen,
    onOpen: openEditTaskForm,
    onClose: closeEditTaskForm
  } = useDisclosure()

  const updateTask = useUpdateTask()
  const showNotification = useNotification()

  return (
    <React.Fragment>
      <MenuItem icon={<AiOutlineEdit />} onClick={openEditTaskForm}>
        Edit
      </MenuItem>

      <Modal
        title='Edit Task'
        isOpen={editTaskFormIsOpen}
        onClose={closeEditTaskForm}
        topPosition='12%'
      >
        <TaskForm
          defaultValues={{ ...task }}
          onSubmit={(formValues) => {
            updateTask.mutate({
              id: task.id,
              ...formValues
            })
            closeEditTaskForm()
            showNotification({ type: 'success', message: 'Task updated' })
          }}
          submitButtonText='Update Task'
        />
      </Modal>
    </React.Fragment>
  )
}
