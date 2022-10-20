import { Modal } from '@/components/Elements'
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useBoards } from '../hooks'
import { CreateBoardForm } from '../components/CreateBoardForm'

export const BoardShowcase = () => {
  const { data: boards, isLoading, isError } = useBoards()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

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
      {boards.map(({ id, name, slug }) => (
        <GridItem
          as='li'
          key={id}
          textTransform='capitalize'
          borderRadius='lg'
          color='#1A202C'
          bg={colorMode === 'light' ? '#FFF1B8' : '#d1aa61'}
          minH={0}
          minW={0}
          shadow='sm'
          _hover={{
            '.chakra-icon': {
              transform: 'translateX(5px)'
            }
          }}
        >
          <Stack as={NavLink} to={slug} p={5}>
            <HStack>
              <Text fontWeight='semibold'>{name}</Text>
              <Icon
                as={AiOutlineArrowRight}
                transition='ease-in-out'
                transitionDuration='200ms'
              />
            </HStack>
            <Text mt={2}>0 tasks</Text>
          </Stack>
        </GridItem>
      ))}
    </Grid>
  )
}
