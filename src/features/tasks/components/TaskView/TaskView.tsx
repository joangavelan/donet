import { Stack } from '@chakra-ui/react'
import { Header } from './Header'
import { Description } from './Description'
import type { Tasks } from '@/types'
import { Template } from './Template'
import { Subtasks } from './Subtasks'

type TaskViewProps = {
  task: Tasks['Row']
}

export const TaskView = ({ task }: TaskViewProps) => {
  return (
    <Stack gap={5}>
      <Header taskId={task.id}>{task.title}</Header>
      <Description>{task.description || 'No description'}</Description>
      <Subtasks subtasks={task.subtasks} originalTask={task} />
      <Template originalTask={task} />
    </Stack>
  )
}
