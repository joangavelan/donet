import { Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type RedirectsProps = {
  question: string
  toggleLink: {
    href: string
    text: string
  }
}

export const Redirects = ({ question, toggleLink }: RedirectsProps) => {
  return (
    <VStack>
      <Text>{question}</Text>
      <Text
        as={Link}
        to={toggleLink.href}
        color='authButtonColor'
        fontWeight='semibold'
        _hover={{ textDecoration: 'underline' }}
      >
        {toggleLink.text}
      </Text>
    </VStack>
  )
}
