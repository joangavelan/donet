import { supabase } from '@/lib/supabase'
import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { useRef } from 'react'

const features = [
  'Create your own boards',
  'Add tasks to your different boards',
  'Create columns to group your tasks.',
  'Add subtasks',
  'Set the priority of your tasks',
  'Mark your tasks and subtasks as you complete them',
  'Drag and drop your tasks between columns'
]

type WelcomeProps = {
  isOpen: boolean
  onClose: () => void
}

export const Welcome = ({ isOpen, onClose }: WelcomeProps) => {
  const user = supabase.auth.user()
  // used to prevent autofocus on first tabable element (continue button)
  const initialRef = useRef(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent py={2} top='12%' ref={initialRef}>
        <ModalHeader textAlign='center' fontSize='2xl' fontWeight='bold'>
          Welcome to Donet!
        </ModalHeader>

        <ModalBody>
          <Text lineHeight={2}>
            You have logged in as{' '}
            <Text as='span' fontWeight='semibold'>
              {user?.email}
            </Text>
            .
          </Text>

          <Text lineHeight={2} my={1.5}>
            In this app you will be able to:
          </Text>
          <UnorderedList lineHeight={1.7}>
            {features.map((feature, index) => (
              <ListItem key={index}>{feature}</ListItem>
            ))}
          </UnorderedList>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='orange' onClick={onClose} m='auto'>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
