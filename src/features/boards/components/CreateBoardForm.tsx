import { OneInputForm } from '@/components/Elements'
import { useUser } from '@/features/auth/hooks'
import { useNotification } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import { useCreateBoard } from '../hooks'

type CreateBoardFormProps = {
  closeModal: () => void
}

export const CreateBoardForm = ({ closeModal }: CreateBoardFormProps) => {
  const user = useUser()
  const createBoard = useCreateBoard()
  const showNotification = useNotification()
  const navigate = useNavigate()

  return (
    <OneInputForm
      onSubmit={({ name }) => {
        const slug = slugify(name, { lower: true })

        createBoard.mutate(
          { name, slug, user_id: user.id },
          {
            onSuccess: (newBoard) => {
              closeModal()
              navigate(newBoard.slug)
              showNotification({
                type: 'success',
                message: 'New board created'
              })
            }
          }
        )
      }}
      placeholderText='e.g: Platform Launch'
      submitButtonText='Create Board'
      isLoading={createBoard.isLoading}
    />
  )
}
