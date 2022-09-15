import { Flex, Box, Text } from '@chakra-ui/layout'
import { Logo } from '../Logo'
import { NavLink } from 'react-router-dom'
import { Icon } from '@chakra-ui/icon'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import slugify from 'slugify'

const boards = ['Platform Launch', 'Marketing Plan', 'Roadmap']

export const Sidebar = () => {
  return (
    <Flex
      as='aside'
      h='full'
      w='30%'
      maxW='500px'
      direction='column'
      borderRight='1px'
      borderColor='gray.200'
    >
      <Logo />
      <Box p={7}>
        <Text as='h2' fontWeight='semibold' mb={7}>
          BOARDS
        </Text>
        <Flex as='ul' direction='column' gap={4}>
          <Box as='li'>
            <NavLink to=''>
              <Flex align='center' gap={1.5} bg='orange.100'>
                <Icon as={MdOutlineSpaceDashboard} />
                <Text>Welcome</Text>
              </Flex>
            </NavLink>
          </Box>
          {boards.map((board, index) => (
            <Box as='li' key={index}>
              <NavLink to={slugify(board, { lower: true })}>
                <Flex align='center' gap={1.5} bg='orange.100'>
                  <Icon as={MdOutlineSpaceDashboard} />
                  <Text>{board}</Text>
                </Flex>
              </NavLink>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  )
}
