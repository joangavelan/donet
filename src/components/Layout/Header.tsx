import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  IconButton,
  Flex,
  Text,
  GridItem,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react'
import { useLogout } from '@/features/auth/hooks'
import { useParams } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { VscTrash, VscSignOut } from 'react-icons/vsc'
import { useQueryClient } from 'react-query'
import type { Board } from '@/types'
import { Alert } from '../Elements'
import { useDeleteBoard } from '@/features/boards/hooks'

export const Header = () => {
  const {
    isOpen,
    onOpen: openAlertDialog,
    onClose: closeAlertDialog
  } = useDisclosure()
  const { slug } = useParams()
  const boards = useQueryClient().getQueryData(['boards']) as Board[]
  const board = boards?.find((board) => board.slug === slug)
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
        {board && <Button colorScheme='orange'>Add New Task</Button>}

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
