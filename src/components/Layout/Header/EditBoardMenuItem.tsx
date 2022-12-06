import { Modal, OneInputForm } from '@/components/Elements'
import { useBoard, useUpdateBoard } from '@/features/boards/hooks'
import { MenuItem, useDisclosure } from '@chakra-ui/react'
import * as React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@/hooks'
import slugify from 'slugify'

export const EditBoardMenuItem = () => {
  const board = useBoard()
  const {
    isOpen: editBoardFormIsOpen,
    onOpen: openEditBoardForm,
    onClose: closeEditBoardForm
  } = useDisclosure()
  const updateBoard = useUpdateBoard()
  const navigate = useNavigate()
  const showNotification = useNotification()

  return (
    <React.Fragment>
      <MenuItem isDisabled={!board} onClick={openEditBoardForm} icon={<AiOutlineEdit />}>
        Edit Board
      </MenuItem>

      <Modal title='Edit Board' isOpen={editBoardFormIsOpen} onClose={closeEditBoardForm}>
        <OneInputForm
          defaultValues={{ name: board?.name }}
          onSubmit={({ name }) => {
            const slug = slugify(name, { lower: true })

            updateBoard.mutate(
              { id: board.id, name, slug },
              {
                onSuccess: (updatedBoard) => {
                  closeEditBoardForm()
                  showNotification({ type: 'success', message: 'Board updated' })
                  navigate(updatedBoard.slug)
                }
              }
            )
          }}
          isLoading={updateBoard.isLoading}
          submitButtonText='Update Board'
        />
      </Modal>
    </React.Fragment>
  )
}
