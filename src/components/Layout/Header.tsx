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
  useColorModeValue
} from '@chakra-ui/react'
import { useLogout } from '@/features/auth/hooks'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { VscTrash, VscSignOut } from 'react-icons/vsc'
import { Alert } from '../Elements'
import { useBoard, useDeleteBoard } from '@/features/boards/hooks'
import { CreateTask } from '@/features/tasks/components'

export const Header = () => {
  const {
    isOpen,
    onOpen: openAlertDialog,
    onClose: closeAlertDialog
  } = useDisclosure()
  const board = useBoard()
  const logoutMutation = useLogout()
  const deleteBoardMutation = useDeleteBoard()

  const handleDeleteBoard = () => {
    deleteBoardMutation.mutate(board?.id, {
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
      <Text
        as='h1'
        fontSize='2xl'
        fontWeight='semibold'
        textTransform='capitalize'
      >
        {board?.name ?? 'Boards'}
      </Text>

      <Flex gap={3}>
        {board && <CreateTask />}

        <Menu>
          <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
          <MenuList sx={{ '.chakra-menu__icon': { fontSize: 'md' } }}>
            <MenuItem
              isDisabled={!board}
              onClick={openAlertDialog}
              icon={<VscTrash />}
            >
              Delete Board
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => logoutMutation.mutate()}
              icon={<VscSignOut />}
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Alert
        header='Delete board'
        body='Are you sure you want to delete this board?'
        isOpen={isOpen}
        onClose={closeAlertDialog}
        onConfirm={handleDeleteBoard}
        loadingAction={deleteBoardMutation.isLoading}
      />
    </GridItem>
  )
}
