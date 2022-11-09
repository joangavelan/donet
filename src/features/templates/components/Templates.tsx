import { useBoard } from '@/features/boards/hooks'
import { Grid, Spinner, Text } from '@chakra-ui/react'
import { useTemplates } from '../hooks'
import { Template } from './Template'
import { AddTemplateColumn } from './AddTemplateColumn'

export const Templates = () => {
  const board = useBoard()
  const { data: templates, isLoading, isError } = useTemplates(board.id)

  if (isLoading) {
    return (
      <Container>
        <Spinner size='lg' />
      </Container>
    )
  }

  if (isError) {
    return (
      <Container>
        <Text color='red' fontSize='xl' fontWeight='semibold'>
          Whoops! An error occurred!
        </Text>
      </Container>
    )
  }

  return (
    <Grid
      as='ul'
      h='100%'
      gap={4}
      gridAutoFlow='column'
      gridAutoColumns='330px'
      overflow='scroll'
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
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid placeItems='center' h='100%'>
      {children}
    </Grid>
  )
}
