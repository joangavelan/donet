import type { Tasks } from '@/types'
import { reorderArray } from '@/utils'
import { DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import { useQueryClient } from 'react-query'
import { useUpsertTasks } from '../hooks'

export const DndContext = ({ children }: { children: React.ReactNode }) => {
  const queryCLient = useQueryClient()
  const upsertTasks = useUpsertTasks()

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    // if user tries to drop in an unknown destination
    if (!destination) return

    // if the user drag and drops back in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    // If the user drops within the same column but in a different position
    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
      const templateId = Number(source.droppableId)

      queryCLient.setQueryData(['tasks', templateId], (tasks) => {
        const reorderedTasks = reorderArray(
          tasks as Array<Tasks['Row']>,
          source.index,
          destination.index
        ).map((task, index) => ({ ...task, index }))

        upsertTasks.mutate(reorderedTasks)

        return reorderedTasks
      })
    }

    // If the user moves a task from one column (template) to another
    if (source.droppableId !== destination.droppableId) {
      const sourceTemplateId = Number(source.droppableId)
      const destinationTemplateId = Number(destination.droppableId)

      queryCLient.setQueryData(['tasks', sourceTemplateId], (tasks) => {
        const movingTask = (tasks as Array<Tasks['Row']>)[source.index]

        const updatedSourceTasks = (tasks as Array<Tasks['Row']>)
          .filter((task) => task.id !== movingTask.id)
          .map((task, index) => ({ ...task, index }))

        queryCLient.setQueryData(['tasks', destinationTemplateId], (tasks) => {
          const updatedMovingTask = {
            ...movingTask,
            template_id: destinationTemplateId,
            index: destination.index
          }

          const destinationTasks = [...(tasks as Array<Tasks['Row']>)]

          destinationTasks.splice(destination.index, 0, updatedMovingTask)

          const updatedDestinationTasks = destinationTasks.map(
            (task, index) => ({
              ...task,
              index
            })
          )

          const allUpsertedTasks = [
            ...updatedSourceTasks,
            ...updatedDestinationTasks
          ]

          upsertTasks.mutate(allUpsertedTasks)

          return updatedDestinationTasks
        })

        return updatedSourceTasks
      })
    }
  }

  return <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
}
