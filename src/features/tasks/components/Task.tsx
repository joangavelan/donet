import { Modal } from '@/components/Elements'
import type { Tasks } from '@/types'
import { getPercentage } from '@/utils'
import {
  Box,
  HStack,
  Icon,
  Progress,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { getProgressBarColorScheme } from '../utils'
import { TaskView } from './TaskView'

type TaskProps = {
  task: Tasks['Row']
}

export const Task = ({ task }: TaskProps) => {
  const {
    isOpen: taskViewIsOpen,
    onClose: closeTaskView,
    onOpen: openTaskView
  } = useDisclosure()

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.is_completed
  )
  const progressPercentage = getPercentage(
    completedSubtasks.length,
    task.subtasks.length
  )

  return (
    <Stack
      as='article'
      key={task.id}
      p={5}
      bg={useColorModeValue('#f9f9f9', '#242b38')}
      shadow='md'
      gap={2}
      borderRadius='lg'
    >
      {/* header */}
      <Stack>
        <Text
          as='h4'
          fontWeight='semibold'
          _hover={{
            color: useColorModeValue('orange.700', 'orange.200')
          }}
          cursor='pointer'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          overflow='hidden'
          w='max-content'
          onClick={openTaskView}
        >
          {task.title}
        </Text>

        {task.description && (
          <Text
            fontWeight='medium'
            fontSize='sm'
            color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
            textOverflow='ellipsis'
            whiteSpace='nowrap'
            overflow='hidden'
          >
            {task.description}
          </Text>
        )}
      </Stack>

      {/* progress */}
      {!!task.subtasks.length && (
        <Stack gap={1}>
          <HStack justify='space-between' fontSize='sm'>
            <HStack
              color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
            >
              <Icon as={AiOutlineUnorderedList} />
              <Text>Progress</Text>
            </HStack>

            <Box as='span'>
              {completedSubtasks.length}/{task.subtasks.length}
            </Box>
          </HStack>

          <Progress
            value={progressPercentage}
            size='xs'
            colorScheme={getProgressBarColorScheme(progressPercentage)}
          />
        </Stack>
      )}

      {/* task view */}
      <Modal isOpen={taskViewIsOpen} onClose={closeTaskView} topPosition='17%'>
        <TaskView task={task} />
      </Modal>
    </Stack>
  )
}
