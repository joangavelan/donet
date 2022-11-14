import { Stack } from '@chakra-ui/react'
import { Header } from './Header'
import { Description } from './Description'
import type { Tasks, Subtasks as TSubtasks } from '@/types'
import { Template } from './Template'
import { useUpdateTask } from '../../hooks'
import { Subtasks } from './Subtasks'

type TaskViewProps = {
  task: Tasks['Row']
}

export const TaskView = ({ task }: TaskViewProps) => {
  const subtasks = JSON.parse(task.subtasks) as TSubtasks
  const updateTask = useUpdateTask()

  const handleTaskUpdate = (updatedProps: Tasks['Update']) => {
    updateTask.mutate({
      originalTask: task,
      updatedProps
    })
  }

  return (
    <Stack gap={5}>
      <Header>{task.title}</Header>
      <Description>{task.description || 'No description'}</Description>
      <Subtasks subtasks={subtasks} handleTaskUpdate={handleTaskUpdate} />
      <Template
        templateId={task.template_id}
        handleTaskUpdate={handleTaskUpdate}
      />
    </Stack>
  )
}
