import { useUser } from '@/features/auth/hooks'
import { Flex, Box, Text, Link, Image, VStack, Button, HStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { AiOutlineHome, AiOutlineGithub } from 'react-icons/ai'
import { useNavigate } from 'react-router'

export const Landing = () => {
  const user = useUser()
  const navigate = useNavigate()

  const handleStart = () => {
    if (user) {
      navigate('/boards')
    } else {
      navigate('/auth/login')
    }
  }

  return (
    <Flex h='100vh'>
      <Helmet>
        <title>Donet | Task Management App</title>
      </Helmet>

      <VStack
        maxW='550px'
        h='min-content'
        mx='auto'
        pos='relative'
        top='18%'
        textAlign='center'
        gap={6}
        p={6}
      >
        <Box>
          <Text as='h1' fontSize={['3xl', '4xl']} fontWeight='extrabold'>
            Welcome to Donet!
          </Text>
          <Text fontSize={['md', 'lg']}>Your centralized task management app.</Text>
        </Box>

        <Image src='/checklist.png' w={[48, 60]} alt='checklist logo' />

        <Text fontSize={['md', 'lg']}>
          This project is part of a personal portfolio. You can find more projects like this on my
          personal{' '}
          <Link href='https://github.com/joangavelan' target='_blank' fontWeight='semibold'>
            github account
          </Link>
          .
        </Text>

        <HStack gap={[4, 6]}>
          <Button leftIcon={<AiOutlineHome />} colorScheme='orange' onClick={handleStart}>
            Get Started
          </Button>
          <Button
            leftIcon={<AiOutlineGithub />}
            as='a'
            href='https://github.com/joangavelan/donet'
            target='_blank'
          >
            Github Repo
          </Button>
        </HStack>
      </VStack>
    </Flex>
  )
}
