import * as React from 'react'
import { Alert } from '@/components/Elements'
import { MenuItem, useDisclosure } from '@chakra-ui/react'
import { useDeleteTemplate } from '../../hooks'
import { BiTrash } from 'react-icons/bi'

type DeleteTemplateMenuItemProps = {
  templateId: number
}

export const DeleteTemplateMenuItem = ({ templateId }: DeleteTemplateMenuItemProps) => {
  const { isOpen, onClose: closeAlertDialog, onOpen: openAlertDialog } = useDisclosure()

  const archiveTemplate = useDeleteTemplate()

  const handleArchiveTemplate = () => {
    archiveTemplate.mutate(templateId, {
      onSuccess: () => {
        closeAlertDialog()
      }
    })
  }

  return (
    <React.Fragment>
      <MenuItem icon={<BiTrash />} onClick={openAlertDialog}>
        Delete
      </MenuItem>

      <Alert
        header='Delete Template'
        body='Are you sure you want to delete this template? All tasks within this template will also be deleted.'
        confirmText='Delete'
        onConfirm={handleArchiveTemplate}
        isOpen={isOpen}
        onClose={closeAlertDialog}
        loadingAction={archiveTemplate.isLoading}
      />
    </React.Fragment>
  )
}
