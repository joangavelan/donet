import { useBoard } from '@/features/boards/hooks'
import {
  Grid,
  HStack,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { useTemplates } from '../hooks'
import { Template } from './Template'
import { VscEmptyWindow } from 'react-icons/vsc'

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
          Couldn't fetch the templates
        </Text>
      </Container>
    )
  }

  if (!templates?.length) {
    return (
      <Container>
        <VStack gap={1} color={useColorModeValue('#85878d', 'gray.500')}>
          <Icon as={VscEmptyWindow} boxSize='8' />
          <Text fontSize='lg' fontWeight='medium'>
            Nothing here yet.
          </Text>
        </VStack>
      </Container>
    )
  }

  return (
    <HStack as='ul' gap={4} align='start' h='100%' overflow='scroll'>
      {templates.map((template) => (
        <Template key={template.id} {...template} />
      ))}
    </HStack>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid placeItems='center' h='100%'>
      {children}
    </Grid>
  )
}
