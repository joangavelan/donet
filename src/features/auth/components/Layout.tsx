import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

type LayoutProps = {
  title: string
  children: React.ReactNode
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Flex align='center' justify='center' h='100vh'>
      <Box mb={20}>
        <Image src='/tasks.png' w={130} marginX='auto' mb={4} />
        <Text as='h1' fontSize='3xl' fontWeight='bold' mb={5}>
          {title}
        </Text>
        <Box>{children}</Box>
      </Box>
    </Flex>
  )
}
