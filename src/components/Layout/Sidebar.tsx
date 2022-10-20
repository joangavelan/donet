import {
  useColorMode,
  Text,
  HStack,
  Icon,
  GridItem,
  Button,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { Logo } from '../Logo'
import { NavLink } from 'react-router-dom'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BsMoon, BsSun } from 'react-icons/bs'
import { BoardList, CreateBoardForm } from '@/features/boards/components'
import { Modal } from '../Elements'

export const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <GridItem
      display='grid'
      as='aside'
      area='aside'
      gridTemplateRows={'100px auto 1fr auto'}
      borderRight='1px'
      borderColor={colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.200'}
      gap={7}
      px={7}
    >
      <Logo />

      <HStack justifyContent='space-between'>
        <Text as='h2' fontWeight='semibold' _hover={{ color: 'orange.400' }}>
          <NavLink to='/boards'>BOARDS</NavLink>
        </Text>
        <Icon
          as={AiOutlinePlusSquare}
          color={colorMode === 'light' ? 'blackAlpha.800' : 'whiteAlpha.800'}
          boxSize='1.3rem'
          cursor='pointer'
          _hover={{ color: 'orange.400' }}
          title='new board'
          onClick={onOpen}
        />
        <Modal title='New Board' isOpen={isOpen} onClose={onClose}>
          <CreateBoardForm closeModal={onClose} />
        </Modal>
      </HStack>

      <BoardList />

      <HStack
        gap={1}
        bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
        maxW='max-content'
        borderRadius='md'
        mb={7}
        paddingEnd={5}
      >
        <Button onClick={toggleColorMode}>
          {useColorModeValue(<BsMoon />, <BsSun fontSize='1.2rem' />)}
        </Button>
        <p>{useColorModeValue('Light Mode', 'Dark Mode')}</p>
      </HStack>
    </GridItem>
  )
}
