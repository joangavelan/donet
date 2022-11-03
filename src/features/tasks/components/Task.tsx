import type { Tasks, Subtasks } from '@/types'
import { getPercentage } from '@/utils'
import {
  Box,
  HStack,
  Icon,
  Progress,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { getProgressBarColorScheme } from '../utils'

export const Task = ({ id, title, description, subtasks }: Tasks['Row']) => {
  const totalSubtasks = JSON.parse(subtasks) as Subtasks
  const completedSubtasks = totalSubtasks.filter(
    (subtask) => subtask.isCompleted
  )
  const progressPercentage = getPercentage(
    completedSubtasks.length,
    totalSubtasks.length
  )

  return (
    <Stack
      key={id}
      p={5}
      bg={useColorModeValue('#f9f9f9', '#242b38')}
      shadow='md'
      gap={2}
    >
      {/* header */}
      <Stack>
        <Text
          as='h3'
          fontWeight='semibold'
          _hover={{
            color: useColorModeValue('orange.700', 'orange.200')
          }}
          cursor='pointer'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          overflow='hidden'
        >
          {title}
        </Text>

        <Text
          fontWeight='medium'
          fontSize='sm'
          color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
          textOverflow='ellipsis'
          whiteSpace='nowrap'
          overflow='hidden'
        >
          {description}
        </Text>
      </Stack>

      {/* progress */}
      {!!totalSubtasks.length && (
        <Stack gap={1}>
          <HStack justify='space-between' fontSize='sm'>
            <HStack
              color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
            >
              <Icon as={AiOutlineUnorderedList} />
              <Text>Progress</Text>
            </HStack>

            <Box as='span'>
              {completedSubtasks.length}/{totalSubtasks.length}
            </Box>
          </HStack>

          <Progress
            value={progressPercentage}
            size='xs'
            colorScheme={getProgressBarColorScheme(progressPercentage)}
          />
        </Stack>
      )}
    </Stack>
  )
}
