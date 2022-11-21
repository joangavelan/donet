import type { Tasks } from '@/types'
import { Checkbox, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'

type SubtasksProps = {
  subtasks: Tasks['Row']['subtasks']
  handleTaskUpdate: (updatedTaskProps: Tasks['Update']) => void
}

export const Subtasks = ({ subtasks, handleTaskUpdate }: SubtasksProps) => {
  const completedSubtasks = subtasks.filter((subtask) => subtask.is_completed)

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, subtaskId: string) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      if (subtask.id === subtaskId) {
        return { ...subtask, is_completed: e.target.checked }
      }
      return subtask
    })
    handleTaskUpdate({ subtasks: updatedSubtasks })
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
