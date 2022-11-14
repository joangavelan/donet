import { Select, Stack, Text } from '@chakra-ui/react'
import { useBoard } from '@/features/boards/hooks'
import { useTemplates } from '@/features/templates/hooks'
import type { Tasks } from '@/types'

type TemplateProps = {
  templateId: number
  handleTaskUpdate: (updatedTaskProps: Tasks['Update']) => void
}

export const Template = ({ templateId, handleTaskUpdate }: TemplateProps) => {
  const currentBoard = useBoard()
  const { data: availableTemplates } = useTemplates(currentBoard.id)

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleTaskUpdate({ template_id: Number(e.target.value) })
  }

  return (
    <Stack>
      <Text fontSize='sm' fontWeight='semibold'>
        Template
      </Text>
      <Select defaultValue={templateId} onChange={handleOnChange}>
        {availableTemplates?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
    </Stack>
  )
}
