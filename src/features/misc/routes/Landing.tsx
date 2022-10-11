import { supabase } from '@/lib/supabase'
import { Button } from '@chakra-ui/button'
import { Icon } from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Flex, Box, Text, Link } from '@chakra-ui/layout'
import { AiOutlineHome, AiOutlineGithub } from 'react-icons/ai'
import { useNavigate } from 'react-router'

export const Landing = () => {
  const navigate = useNavigate()
  const user = supabase.auth.user()

  const handleStart = () => {
    if (user) {
      navigate('/app')
    } else {
      navigate('/auth/login')
    }
  }

  return (
    <Flex align='center' justify='center' h='100vh'>
      <Flex
        direction='column'
        align='center'
        maxW='550px'
        textAlign='center'
        gap={6}
        mb={20}
      >
        <Box>
          <Text as='h1' fontSize='4xl' fontWeight='extrabold'>
            Welcome to Donet!
          </Text>
          <Text fontSize='lg'>Your centralized task management app.</Text>
        </Box>

        <Image src='/tasks.png' w={60} />

        <Text fontSize='lg'>
          This project is part of a personal portfolio. You can find more
          projects like this on my personal{' '}
          <Link
            href='https://github.com/joangavelan'
            target='_blank'
            fontWeight='semibold'
          >
            github account
          </Link>
          .
        </Text>

        <Flex gap={8}>
          <Button colorScheme='orange' onClick={handleStart}>
            <Icon as={AiOutlineHome} />
            <Text as='span' ml={1.5}>
              Get Started
            </Text>
          </Button>
          <Button
            as='a'
            href='https://github.com/joangavelan/donet'
            target='_blank'
          >
            <Icon as={AiOutlineGithub} />
            <Text as='span' ml={1.5}>
              Github Repo
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
