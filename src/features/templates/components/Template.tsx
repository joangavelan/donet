import { Alert } from '@/components/Elements'
import type { Templates } from '@/types'
import {
  GridItem,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { BiArchiveIn } from 'react-icons/bi'
import { useArchiveTemplate } from '../hooks'

export const Template = ({ id, name }: Templates['Row']) => {
  const {
    isOpen,
    onClose: closeAlertDialog,
    onOpen: openAlertDialog
  } = useDisclosure()
  const archiveTemplate = useArchiveTemplate()

  const handleArchiveTemplate = () => {
    archiveTemplate.mutate(id, {
      onSuccess: () => {
        closeAlertDialog()
      }
    })
  }

  return (
    <GridItem
      as='li'
      height='max-content'
      p={5}
      overflow='scroll'
      bg={useColorModeValue('orange.50', '#1f2431')}
    >
      <HStack align='center' justify='space-between'>
        <Text
          textTransform='capitalize'
          fontWeight='semibold'
          color={useColorModeValue('#343945', 'gray.400')}
        >
          {name} (0)
        </Text>
        <>
          <Icon
            as={BiArchiveIn}
            color={useColorModeValue('#343945', 'gray.400')}
            cursor='pointer'
            _hover={{ color: 'orange.500' }}
            onClick={openAlertDialog}
          />
          <Alert
            header='Archive Template'
            body='Are you sure you want to archive this template?'
            confirmText='Archive'
            onConfirm={handleArchiveTemplate}
            isOpen={isOpen}
            onClose={closeAlertDialog}
            loadingAction={archiveTemplate.isLoading}
          />
        </>
      </HStack>
    </GridItem>
  )
}
