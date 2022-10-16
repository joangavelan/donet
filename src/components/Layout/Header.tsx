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
  useColorMode,
  GridItem
} from '@chakra-ui/react'
import { useLogout } from '@/features/auth/hooks'
import { useParams } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const Header = () => {
  const { colorMode } = useColorMode()
  const { board } = useParams()
  const logoutMutation = useLogout()

  return (
    <GridItem
      as='header'
      area='header'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      px={7}
      borderBottom='1px'
      borderColor={colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.200'}
    >
      <Text as='h1' fontSize='2xl' fontWeight='semibold'>
        {board ?? 'Boards'}
      </Text>

      <Flex align='center' gap={3}>
        {board && <Button colorScheme='orange'>Add New Task</Button>}

        <Menu>
          <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
          <MenuList>
            <MenuItem isDisabled={!board}>Delete Board</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => logoutMutation.mutate()}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </GridItem>
  )
}
