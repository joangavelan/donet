import type { Tasks } from '@/types'
import { Checkbox, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useUpdateTask } from '../../hooks'

type SubtasksProps = {
  subtasks: Tasks['Row']['subtasks']
  originalTask: Tasks['Row']
}

export const Subtasks = ({ subtasks, originalTask }: SubtasksProps) => {
  const completedSubtasks = subtasks.filter((subtask) => subtask.is_completed)
  const updateTask = useUpdateTask()

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, subtaskId: string) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      if (subtask.id === subtaskId) {
        return { ...subtask, is_completed: e.target.checked }
      }
      return subtask
    })

    const updatedTask = { ...originalTask, subtasks: updatedSubtasks }

    updateTask.mutate(updatedTask)
  }

  if (!subtasks.length) {
    return null
  }

  return (
    <Stack gap={2}>
      <Text fontSize='sm' fontWeight='semibold'>
        Subtasks ({completedSubtasks.length} of {subtasks.length})
      </Text>

      <Stack maxH='260px' overflow='scroll'>
        {subtasks.map((subtask) => (
          <HStack
            key={subtask.id}
            gap={1}
            p={3}
            borderRadius='md'
            bg={useColorModeValue('orange.100', 'blackAlpha.400')}
          >
            <Checkbox
              defaultChecked={subtask.is_completed}
              onChange={(e) => handleCheck(e, subtask.id)}
              colorScheme='orange'
              borderColor={useColorModeValue('blackAlpha.700', '')}
            />
            <Text fontSize='sm' color={useColorModeValue('', 'whiteAlpha.800')}>
              {subtask.name}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Stack>
  )
}
