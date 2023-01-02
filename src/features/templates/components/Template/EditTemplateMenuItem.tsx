import { Modal, SingleInputForm } from '@/components/Elements'
import { useNotification } from '@/hooks'
import { MenuItem, useDisclosure } from '@chakra-ui/react'
import * as React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { useUpdateTemplate } from '../../hooks'

type EditTemplateMenuItemProps = {
  templateId: number
  templateName: string
}

export const EditTemplateMenuItem = ({ templateId, templateName }: EditTemplateMenuItemProps) => {
  const {
    isOpen: editTemplateFormIsOpen,
    onOpen: openEditTemplateForm,
    onClose: closeEditTemplateForm
  } = useDisclosure()

  const updateTemplate = useUpdateTemplate()
  const showNotification = useNotification()

  return (
    <React.Fragment>
      <MenuItem icon={<AiOutlineEdit />} onClick={openEditTemplateForm}>
        Edit
      </MenuItem>

      <Modal title='Edit template' isOpen={editTemplateFormIsOpen} onClose={closeEditTemplateForm}>
        <SingleInputForm
          onSubmit={({ name }) => {
            updateTemplate.mutate(
              { id: templateId, name },
              {
                onSuccess: () => {
                  closeEditTemplateForm()
                  showNotification({ type: 'success', message: 'Template updated' })
                }
              }
            )
          }}
          submitButtonText='Update Template'
          defaultValues={{ name: templateName }}
          isLoading={updateTemplate.isLoading}
        />
      </Modal>
    </React.Fragment>
  )
}
