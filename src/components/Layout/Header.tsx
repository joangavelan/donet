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
  useDisclosure,
  useColorModeValue,
  HStack,
  Box
} from '@chakra-ui/react'
import { useSignOut } from '@/features/auth/hooks'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { VscTrash, VscSignOut } from 'react-icons/vsc'
import { Alert } from '../Elements'
import { useBoard, useDeleteBoard } from '@/features/boards/hooks'
import { CreateTaskButton } from '@/features/tasks/components'
import { BoardsPopover } from '@/features/boards/components'
import { Logo } from '../Logo'

export const Header = () => {
  const { isOpen, onOpen: openAlertDialog, onClose: closeAlertDialog } = useDisclosure()
  const board = useBoard()
  const signOut = useSignOut()
  const deleteBoard = useDeleteBoard()

  const handleDeleteBoard = () => {
    deleteBoard.mutate(board.id, {
      onSuccess: () => {
        closeAlertDialog()
      }
    })
  }

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
            <MenuItem isDisabled={!board} onClick={openAlertDialog} icon={<VscTrash />}>
              Delete Board
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<VscSignOut />} onClick={() => signOut.mutate()}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>

        <Alert
          header='Delete board'
          body='Are you sure you want to delete this board? All templates and tasks within this board will also be deleted.'
          isOpen={isOpen}
          onClose={closeAlertDialog}
          onConfirm={handleDeleteBoard}
          loadingAction={deleteBoard.isLoading}
        />
      </Flex>
    </GridItem>
  )
}
