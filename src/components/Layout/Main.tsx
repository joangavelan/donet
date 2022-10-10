import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'
import { supabase } from '@/lib/supabase'
import { useNotification } from '@/hooks/useNotification'

type MainProps = {
  children: React.ReactNode
}

export const Main = ({ children }: MainProps) => {
  const { board } = useParams()
  const showNotification = useNotification()
  const navigate = useNavigate()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      showNotification({ type: 'error', message: error.message })
      throw error
    }
    navigate('/auth/login')
  }

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
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {/* content */}
      <Box flex={1} p={5}>
        {children}
      </Box>
    </Flex>
  )
}
