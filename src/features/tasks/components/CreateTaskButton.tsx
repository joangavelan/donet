import * as React from 'react'
import { Modal } from '@/components/Elements'
import { Button, IconButton, useDisclosure } from '@chakra-ui/react'
import { useTemplates } from '@/features/templates/hooks'
import { useBoard } from '@/features/boards/hooks'
import { useNotification } from '@/hooks'
import { TiPlus } from 'react-icons/ti'
import { TaskForm } from './TaskForm'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateTask } from '../hooks'
import type { Tasks } from '@/types'

export const CreateTaskButton = () => {
  const {
    isOpen: createTaskFormIsOpen,
    onOpen: openCreateTaskForm,
    onClose: closeCreateTaskForm
  } = useDisclosure()
  const board = useBoard()
  const { data: templates } = useTemplates(board.id)
  const createTask = useCreateTask()
  const queryClient = useQueryClient()
  const showNotification = useNotification()

  type Task = Tasks['Row']

  const handleCreateNewTask = () => {
    if (!templates?.length) {
      showNotification({
        type: 'warning',
        message: 'You need to add a template first'
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

      <Modal
        title='Add New Task'
        isOpen={createTaskFormIsOpen}
        onClose={closeCreateTaskForm}
        topPosition='12%'
      >
        <TaskForm
          // eslint-disable-next-line @typescript-eslint/naming-convention
          onSubmit={({ title, description, template_id, subtasks }) => {
            const templateTasks = queryClient.getQueryData(['tasks', template_id]) as Task[]

            createTask.mutate(
              {
                title,
                description,
                subtasks,
                template_id,
                index: templateTasks.length
              },
              {
                onSuccess: () => {
                  showNotification({ type: 'success', message: 'New task created' })
                  closeCreateTaskForm()
                }
              }
            )
          }}
          submitButtonText='Create Task'
          isLoading={createTask.isLoading}
        />
      </Modal>
    </React.Fragment>
  )
}
