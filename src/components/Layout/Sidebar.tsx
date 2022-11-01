import {
  useColorMode,
  Text,
  HStack,
  GridItem,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import { Logo } from '../Logo'
import { NavLink } from 'react-router-dom'
import { BsMoon, BsSun } from 'react-icons/bs'
import { BoardList, CreateBoard } from '@/features/boards/components'

export const Sidebar = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <GridItem
      display='grid'
      as='aside'
      area='aside'
      gridTemplateRows={'100px auto 1fr auto'}
      borderRight='1px'
      borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
      gap={7}
      px={7}
    >
      <Logo />

      <HStack>
        <Text as='h2' fontWeight='semibold' _hover={{ color: 'orange.400' }}>
          <NavLink to='/boards'>BOARDS</NavLink>
        </Text>

        <CreateBoard />
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
