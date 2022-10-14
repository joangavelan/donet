import { BsThreeDotsVertical } from 'react-icons/bs'
import { useParams } from 'react-router'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  IconButton,
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import { useLogout } from '@/features/auth/hooks'

type MainProps = {
  children: React.ReactNode
}

export const Main = ({ children }: MainProps) => {
  const { board } = useParams()
  const logoutMutation = useLogout()

  return (
    <Flex as='main' flex={1} direction='column'>
      {/* header */}
      <Flex
        as='header'
        align='center'
        justify='space-between'
        h='100px'
        px={7}
        bg='whiteAlpha.200'
        borderBottom='1px'
        borderColor='gray.200'
      >
        <Text fontSize='2xl' fontWeight='semibold'>
          {board ?? 'Welcome!'}
        </Text>
        <Flex align='center' gap={3}>
          <Button>Add New Task</Button>
          <Menu>
            <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
            <MenuList>
              <MenuItem>Delete Board</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logoutMutation.mutate()}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {/* content (boards outlet) */}
      <Box flex={1} p={5}>
        {children}
      </Box>
    </Flex>
  )
}
