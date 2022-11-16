import { Stack } from '@chakra-ui/react'
import { Header } from './Header'
import { Description } from './Description'
import type { Tasks } from '@/types'
import { Template } from './Template'
import { useUpdateTask } from '../../hooks'
import { Subtasks } from './Subtasks'

type TaskViewProps = {
  task: Tasks['Row']
}

export const TaskView = ({ task }: TaskViewProps) => {
  const updateTask = useUpdateTask()

  const handleTaskUpdate = (updatedProps: Tasks['Update']) => {
    updateTask.mutate({
      originalTask: task,
      updatedProps
    })
  }

  return (
    <Stack gap={5}>
      <Header taskId={task.id}>{task.title}</Header>
      <Description>{task.description || 'No description'}</Description>
      <Subtasks subtasks={task.subtasks} handleTaskUpdate={handleTaskUpdate} />
      <Template
        templateId={task.template_id}
        handleTaskUpdate={handleTaskUpdate}
      />
    </Stack>
  )
}
