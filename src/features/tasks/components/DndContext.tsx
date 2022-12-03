import type { Tasks } from '@/types'
import { reorderArray } from '@/utils'
import { DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import { useQueryClient } from '@tanstack/react-query'
import { useUpsertTasks } from '../hooks'

type Task = Tasks['Row']

export const DndContext = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()
  const upsertTasks = useUpsertTasks()

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // if the user tries to drop the task in an unknown destination
    if (!destination) return

    // if the user drags and drops the task back into the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    // If the user drops the task within the same template but in a different position
    if (source.droppableId === destination.droppableId && source.index !== destination.index) {
      const templateId = Number(source.droppableId)

      queryClient.setQueryData(['tasks', templateId], (tasks) => {
        const reorderedTasks = reorderArray(tasks as Task[], source.index, destination.index)
        const updatedTasks = reorderedTasks.map((task, index) => ({ ...task, index }))

        // keeps task positions updated on the backend
        upsertTasks.mutate(updatedTasks)

        return updatedTasks
      })
    }

    // If the user moves a task from one template to another
    if (source.droppableId !== destination.droppableId) {
      const sourceTemplateId = Number(source.droppableId)
      const destinationTemplateId = Number(destination.droppableId)

      queryClient.setQueryData(['tasks', sourceTemplateId], (tasks) => {
        const movingTask = (tasks as Task[])[source.index]

        const updatedSourceTasks = (tasks as Task[])
          .filter((task) => task.id !== movingTask.id)
          .map((task, index) => ({ ...task, index }))

        queryClient.setQueryData(['tasks', destinationTemplateId], (tasks) => {
          const updatedMovingTask = {
            ...movingTask,
            template_id: destinationTemplateId,
            index: destination.index
          }

          const destinationTasks = [...(tasks as Task[])]

          destinationTasks.splice(destination.index, 0, updatedMovingTask)

          const updatedDestinationTasks = destinationTasks.map((task, index) => ({
            ...task,
            index
          }))

          const allUpdatedTasks = [...updatedSourceTasks, ...updatedDestinationTasks]

          upsertTasks.mutate(allUpdatedTasks)

          return updatedDestinationTasks
        })

        return updatedSourceTasks
      })
    }
  }

  return <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
}
