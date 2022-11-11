import { Text, HStack, GridItem, useColorModeValue } from '@chakra-ui/react'
import { Logo } from '../Logo'
import { NavLink } from 'react-router-dom'
import { BoardList, CreateBoardIcon } from '@/features/boards/components'
import { ColorModeToggle } from '../Elements'

export const Sidebar = () => {
  return (
    <GridItem
      as='aside'
      area='aside'
      display='grid'
      gridTemplateRows={'100px auto 1fr 70px'}
      borderRight='1px'
      borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
      gap={7}
      px={7}
    >
      <Logo />

      <HStack>
        <NavLink to='/boards'>
          <Text as='h2' fontWeight='semibold' _hover={{ color: 'orange.400' }}>
            BOARDS
          </Text>
        </NavLink>

        <CreateBoardIcon />
      </HStack>

      <BoardList />

      <ColorModeToggle />
    </GridItem>
  )
}
