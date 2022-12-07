import { Alert } from '@/components/Elements'
import { MenuItem, useDisclosure } from '@chakra-ui/react'
import * as React from 'react'
import { VscTrash } from 'react-icons/vsc'
import { useDeletetask } from '../../hooks'

type DeleteTaskMenuItemProps = {
  taskId: number
}

export const DeleteTaskMenuItem = ({ taskId }: DeleteTaskMenuItemProps) => {
  const {
    isOpen: deleteTaskAlertDialogIsOpen,
    onOpen: openDeleteTaskAlertDialog,
    onClose: closeDeleteTaskAlertDialog
  } = useDisclosure()

  const deleteTask = useDeletetask()

  const handleDeleteTask = () => {
    deleteTask.mutate(taskId, {
      onSuccess: () => closeDeleteTaskAlertDialog()
    })
  }

  return (
    <React.Fragment>
      <MenuItem icon={<VscTrash />} onClick={openDeleteTaskAlertDialog}>
        Delete
      </MenuItem>

      <Alert
        header='Delete Task'
        body='Please confirm to delete task.'
        isOpen={deleteTaskAlertDialogIsOpen}
        onClose={closeDeleteTaskAlertDialog}
        confirmText='Delete'
        onConfirm={handleDeleteTask}
        loadingAction={deleteTask.isLoading}
      />
    </React.Fragment>
  )
}
