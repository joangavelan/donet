import { useBoard } from '@/features/boards/hooks'
import { Grid, Progress, Text } from '@chakra-ui/react'
import { useTemplates } from '../hooks'
import { Template } from './Template/Template'
import { AddTemplateColumn } from './AddTemplateColumn'

export const Templates = () => {
  const board = useBoard()
  const { data: templates, isLoading, isError } = useTemplates(board.id)

  if (isError) {
    return (
      <Grid placeItems='center' h='100%'>
        <Text color='red' fontSize='xl' fontWeight='semibold'>
          Whoops! An error occurred!
        </Text>
      </Grid>
    )
  }

  return (
    <Grid
      as='ul'
      h='100%'
      pos='relative'
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
      {isLoading && (
        <Progress
          size='xs'
          isIndeterminate
          pos='absolute'
          top={0}
          left={0}
          w='100%'
          colorScheme='orange'
        />
      )}

      {templates?.map((template) => (
        <Template key={template.id} {...template} />
      ))}

      <AddTemplateColumn />
    </Grid>
  )
}
