import { Box, Stack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

type LayoutProps = {
  title: string
  children: React.ReactNode
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Box h='100vh'>
      <Helmet>
        <title>{title} | Donet</title>
      </Helmet>

      <Stack gap={4} maxW={320} m='auto' pos='relative' top='17%'>
        {children}
      </Stack>
    </Box>
  )
}
