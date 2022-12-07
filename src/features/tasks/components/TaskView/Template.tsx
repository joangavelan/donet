import { Select, Stack, Text } from '@chakra-ui/react'
import { useBoard } from '@/features/boards/hooks'
import { useTemplates } from '@/features/templates/hooks'
import type { Tasks } from '@/types'
import { useUpsertTasks } from '../../hooks'
import { useQueryClient } from '@tanstack/react-query'

type Task = Tasks['Row']

type TemplateProps = {
  originalTask: Task
}

export const Template = ({ originalTask }: TemplateProps) => {
  const board = useBoard()
  const { data: templates } = useTemplates(board.id)
  const queryClient = useQueryClient()
  const upsertTasks = useUpsertTasks()

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sourceTemplateId = originalTask.template_id
    const destinationTemplateId = Number(e.target.value)

    queryClient.setQueryData(['tasks', sourceTemplateId], (tasks) => {
      const updatedSourceTasks = (tasks as Task[])
        .filter((task) => task.id !== originalTask.id)
        .map((task, index) => ({ ...task, index }))

      queryClient.setQueryData(['tasks', destinationTemplateId], (tasks) => {
        const destinationTasks = [...(tasks as Task[])]

        const updatedMovingTask = {
          ...originalTask,
          template_id: destinationTemplateId,
          index: destinationTasks.length
        }

        destinationTasks.splice(destinationTasks.length, 0, updatedMovingTask)

        const updatedDestinationTasks = destinationTasks.map((task, index) => ({
          ...task,
          index
        }))

        const allUpsertedTasks = [...updatedSourceTasks, ...updatedDestinationTasks]

        upsertTasks.mutate(allUpsertedTasks)

        return updatedDestinationTasks
      })

      return updatedSourceTasks
    })
  }

  return (
    <Stack>
      <Text fontSize='sm' fontWeight='semibold'>
        Template
      </Text>
      <Select defaultValue={originalTask.template_id} onChange={handleOnChange}>
        {templates?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
    </Stack>
  )
}
