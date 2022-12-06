import { Alert } from '@/components/Elements'
import { useBoard, useDeleteBoard } from '@/features/boards/hooks'
import { MenuItem, useDisclosure } from '@chakra-ui/react'
import * as React from 'react'
import { VscTrash } from 'react-icons/vsc'

export const DeleteBoardMenuItem = () => {
  const {
    isOpen: alertDialogIsOpen,
    onOpen: openAlertDialog,
    onClose: closeAlertDialog
  } = useDisclosure()
  const board = useBoard()

  const deleteBoard = useDeleteBoard()

  const handleDeleteBoard = () => {
    deleteBoard.mutate(board.id, {
      onSuccess: () => {
        closeAlertDialog()
      }
    })
  }

  return (
    <React.Fragment>
      <MenuItem isDisabled={!board} onClick={openAlertDialog} icon={<VscTrash />}>
        Delete Board
      </MenuItem>

      <Alert
        header='Delete board'
        body='Are you sure you want to delete this board? All templates and tasks within this board will also be deleted.'
        isOpen={alertDialogIsOpen}
        onClose={closeAlertDialog}
        onConfirm={handleDeleteBoard}
        loadingAction={deleteBoard.isLoading}
      />
    </React.Fragment>
  )
}
