import { HStack, Stack, Text } from '@chakra-ui/react'
import { Description } from './Description'
import type { Tasks } from '@/types'
import { Template } from './Template'
import { Subtasks } from './Subtasks'
import { TaskOptions } from './TaskOptions'

type TaskViewProps = {
  task: Tasks['Row']
}

export const TaskView = ({ task }: TaskViewProps) => {
  return (
    <Stack gap={5}>
      <HStack gap={10} justify='space-between' align='top'>
        <Text as='h1' fontSize='xl' fontWeight='bold'>
          {task.title}
        </Text>

        <TaskOptions task={task} />
      </HStack>

      <Description>{task.description || 'No description'}</Description>
      <Subtasks subtasks={task.subtasks} originalTask={task} />
      <Template originalTask={task} />
    </Stack>
  )
}
