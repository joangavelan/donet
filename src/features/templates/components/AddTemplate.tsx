import { Modal } from '@/components/Elements'
import {
  Flex,
  GridItem,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { AddTemplateForm } from './AddTemplateForm'
import * as React from 'react'
import { TiPlus } from 'react-icons/ti'

export const AddTemplate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <GridItem
        as='li'
        display='grid'
        placeItems='center'
        bg={useColorModeValue('orange.50', '#1F2431')}
        onClick={onOpen}
        _hover={{
          svg: {
            color: 'orange.500'
          }
        }}
        cursor='pointer'
      >
        <Flex
          align='center'
          fontWeight='semibold'
          fontSize='lg'
          gap={1}
          color={useColorModeValue('#343945', '#818c9a')}
        >
          <Icon as={TiPlus} boxSize={4} /> <Text>Add Template</Text>
        </Flex>
      </GridItem>

      <Modal title='New template' isOpen={isOpen} onClose={onClose}>
        <AddTemplateForm closeModal={onClose} />
      </Modal>
    </React.Fragment>
  )
}
