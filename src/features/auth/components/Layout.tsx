import { Box, Image, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type LayoutProps = {
  title: string
  children: React.ReactNode
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Box h='100vh'>
      <Stack gap={4} maxW={320} m='auto' pos='relative' top='17%'>
        <Stack>
          <Link to='/'>
            <Image src='/tasks.png' w={130} marginX='auto' />
          </Link>

          <Text as='h1' fontSize='3xl' fontWeight='bold' textAlign='center'>
            {title}
          </Text>
        </Stack>

        {children}
      </Stack>
    </Box>
  )
}
