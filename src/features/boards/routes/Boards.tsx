import { Modal } from '@/components/Elements'
import {
  Button,
  Grid,
  Spinner,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'

import { useBoards } from '../hooks'
import { BoardItem, CreateBoardForm } from '../components'

export const Boards = () => {
  const { data: boards, isLoading, isError } = useBoards()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isLoading) {
    return (
      <Grid placeItems='center' h='100%'>
        <Spinner size='lg' />
      </Grid>
    )
  }

  if (isError) {
    return (
      <Text fontSize='2xl' fontWeight='medium' color='red'>
        Oops! An error ocurred... Couldn't fetch the boards :(
      </Text>
    )
  }

  if (!boards?.length) {
    return (
      <VStack gap={2.5} pos='relative' top='32.5%'>
        <VStack>
          <Text fontSize='2xl' fontWeight='semibold'>
            No boards here
          </Text>
          <Text fontSize='lg'>Haven't created any boards yet?</Text>
        </VStack>
        <Button colorScheme='orange' onClick={onOpen}>
          Create New Board
        </Button>

        <Modal title='New Board' isOpen={isOpen} onClose={onClose}>
          <CreateBoardForm closeModal={onClose} />
        </Modal>
      </VStack>
    )
  }

  return (
    <Grid
      as='ul'
      gridTemplateColumns='repeat(4,1fr)'
      gridAutoRows='minmax(min-content, max-content)'
      gap={10}
      h='100%'
      overflow='scroll'
    >
      {boards.map((board) => (
        <BoardItem key={board.id} {...board} />
      ))}
    </Grid>
  )
}
