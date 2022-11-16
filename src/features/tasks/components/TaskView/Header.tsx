import { Alert } from '@/components/Elements'
import {
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { BiArchiveIn } from 'react-icons/bi'
import { useArchivetask } from '../../hooks'

type HeaderProps = {
  taskId: number
  children: React.ReactNode
}

export const Header = ({ taskId, children }: HeaderProps) => {
  const {
    isOpen,
    onClose: closeAlertDialog,
    onOpen: openAlertDialog
  } = useDisclosure()
  const archiveTask = useArchivetask()

  const handleArchiveTask = () => {
    archiveTask.mutate(taskId, {
      onSuccess: () => closeAlertDialog()
    })
  }

  return (
    <HStack gap={10} justify='space-between' align='top'>
      <Text as='h1' fontSize='xl' fontWeight='bold'>
        {children}
      </Text>

      <Icon
        as={BiArchiveIn}
        onClick={openAlertDialog}
        color={useColorModeValue('', 'whiteAlpha.700')}
        cursor='pointer'
        _hover={{ color: 'orange.500' }}
        transform='auto'
        translateY='8px'
      />

      <Alert
        header='Archive'
        body='Confirm to archive this task.'
        isOpen={isOpen}
        onClose={closeAlertDialog}
        confirmText='Archive'
        onConfirm={handleArchiveTask}
        loadingAction={archiveTask.isLoading}
      />
    </HStack>
  )
}
