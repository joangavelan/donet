import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Flex,
  Text,
  GridItem,
  useColorModeValue,
  HStack,
  Box
} from '@chakra-ui/react'
import { useSignOut } from '@/features/auth/hooks'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'
import { useBoard } from '@/features/boards/hooks'
import { CreateTaskButton } from '@/features/tasks/components'
import { BoardsPopover } from '@/features/boards/components'
import { Logo } from '../../Logo'
import { EditBoardMenuItem } from './EditBoardMenuItem'
import { DeleteBoardMenuItem } from './DeleteBoardMenuItem'

export const Header = () => {
  const board = useBoard()
  const signOut = useSignOut()

  return (
    <GridItem
      as='header'
      area='header'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      px={7}
      borderBottom='1px'
      borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
    >
      <HStack gap={1.2}>
        <Box display={{ base: 'block', lg: 'none' }}>
          <Logo />
        </Box>

        <Text
          as='h1'
          fontSize={{ base: '1.25rem', lg: '2xl' }}
          fontWeight='semibold'
          textTransform='capitalize'
          display={{ base: 'none', lg: 'inline-block' }}
        >
          {board?.name ?? 'Boards'}
        </Text>

        <BoardsPopover boardTitle={board?.name ?? 'Boards'} />
      </HStack>

      <Flex gap={3}>
        {board && <CreateTaskButton />}

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            size={{ base: 'sm', lg: 'md' }}
          />
          <MenuList sx={{ '.chakra-menu__icon': { fontSize: 'md' } }}>
            <EditBoardMenuItem />
            <DeleteBoardMenuItem />
            <MenuDivider />
            <MenuItem icon={<VscSignOut />} onClick={() => signOut.mutate()}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </GridItem>
  )
}
