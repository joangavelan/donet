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
import { useQueryClient } from 'react-query'
import type { User } from '@supabase/supabase-js'
import * as React from 'react'

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
  const user = useQueryClient().getQueryData(['user']) as User
  const userFullName = user?.user_metadata.full_name

  // this ref will be used as a workaround to prevent autofocus on the first tabable element (continue button) when the modal pops up
  const initialRef = React.useRef(null)

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent py={2} top='12%' ref={initialRef}>
        <ModalHeader
          textAlign='center'
          fontSize='2xl'
          fontWeight='bold'
          textTransform='capitalize'
        >
          Welcome {userFullName}!
        </ModalHeader>

        <ModalBody>
          <Text mb={3}>In this app you will be able to:</Text>
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