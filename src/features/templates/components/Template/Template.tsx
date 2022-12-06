import { Tasks } from '@/features/tasks/components'
import { useTasks } from '@/features/tasks/hooks'
import type { Templates } from '@/types'
import { GridItem, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { TemplateOptions } from './TemplateOptions'

export const Template = ({ id, name }: Templates['Row']) => {
  const { data: tasks } = useTasks(id)

  return (
    <GridItem
      as='li'
      display='flex'
      flexDirection='column'
      height='max-content'
      p={5}
      bg={useColorModeValue('orange.50', '#1f2431')}
    >
      <HStack align='center' justify='space-between'>
        <Text
          as='h3'
          textTransform='capitalize'
          fontWeight='semibold'
          color={useColorModeValue('#343945', 'gray.400')}
        >
          {name} <Text as='span'>({tasks?.length ?? 0})</Text>
        </Text>

        <TemplateOptions templateId={id} templateName={name} />
      </HStack>

      {tasks && <Tasks templateId={id} tasks={tasks} />}
    </GridItem>
  )
}
