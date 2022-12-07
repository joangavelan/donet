import { Modal, OneInputForm } from '@/components/Elements'
import { useBoard } from '@/features/boards/hooks'
import { useNotification } from '@/hooks'
import { Flex, GridItem, Icon, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import * as React from 'react'
import { TiPlus } from 'react-icons/ti'
import { useAddTemplate } from '../hooks'

export const AddTemplateColumn = () => {
  const {
    isOpen: addTemplateFormIsOpen,
    onOpen: openAddTemplateForm,
    onClose: closeAddTemplateForm
  } = useDisclosure()
  const board = useBoard()
  const addTemplate = useAddTemplate()
  const showNotification = useNotification()

  return (
    <React.Fragment>
      <GridItem
        as='li'
        display='grid'
        placeItems='center'
        bg={useColorModeValue('orange.50', '#1F2431')}
        onClick={openAddTemplateForm}
        _hover={{
          svg: {
            color: 'orange.500'
          }
        }}
        cursor='pointer'
        maxW='330px'
        h='100%'
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

      <Modal title='New template' isOpen={addTemplateFormIsOpen} onClose={closeAddTemplateForm}>
        <OneInputForm
          onSubmit={({ name }) => {
            addTemplate.mutate(
              {
                name,
                board_id: board.id
              },
              {
                onSuccess: () => {
                  closeAddTemplateForm()
                  showNotification({
                    type: 'success',
                    message: 'New template added'
                  })
                }
              }
            )
          }}
          placeholderText='e.g: In Progress'
          submitButtonText='Add template'
          isLoading={addTemplate.isLoading}
        />
      </Modal>
    </React.Fragment>
  )
}
