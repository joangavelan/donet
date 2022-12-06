import * as React from 'react'
import { useBoard } from '@/features/boards/hooks'
import { Box, Grid, Progress, Text } from '@chakra-ui/react'
import { useTemplates } from '../hooks'
import { Template } from './Template/Template'
import { AddTemplateColumn } from './AddTemplateColumn'
import { ErrorBoundary } from 'react-error-boundary'

export const Templates = () => {
  const board = useBoard()
  const { data: templates } = useTemplates(board.id)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <React.Suspense fallback={<SuspenseFallback />}>
        <Grid
          as='ul'
          h='100%'
          gap={4}
          gridAutoFlow='column'
          gridAutoColumns='330px'
          overflow='scroll'
          p={7}
          sx={{
            '& div': {
              borderRadius: 'xl'
            }
          }}
        >
          {templates?.map((template) => (
            <Template key={template.id} {...template} />
          ))}

          <AddTemplateColumn />
        </Grid>
      </React.Suspense>
    </ErrorBoundary>
  )
}

const SuspenseFallback = () => {
  return (
    <Box pos='relative' h='100%'>
      <Box p={7} h='full'>
        <AddTemplateColumn />
      </Box>
      <Progress
        size='xs'
        isIndeterminate
        pos='absolute'
        top={0}
        left={0}
        w='100%'
        colorScheme='orange'
      />
    </Box>
  )
}

const ErrorFallback = () => {
  return (
    <Grid placeItems='center' h='100%'>
      <Text color='red' fontSize='xl' fontWeight='semibold'>
        Whoops! An error occurred!
      </Text>
    </Grid>
  )
}
