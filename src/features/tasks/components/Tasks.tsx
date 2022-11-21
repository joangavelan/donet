import type { Tasks as TTasks } from '@/types'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Task } from '@/features/tasks/components'
import { List, ListItem } from '@chakra-ui/react'

type TasksProps = {
  templateId: number
  tasks: Array<TTasks['Row']>
}

export const Tasks = ({ templateId, tasks }: TasksProps) => {
  return (
    <Droppable droppableId={String(templateId)}>
      {(droppableProvided) => (
        <List ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} pt={0.1}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} index={index} draggableId={String(task.id)}>
              {(draggableProvided) => (
                <ListItem
                  mt={4}
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.dragHandleProps}
                  {...draggableProvided.draggableProps}
                >
                  <Task task={task} />
                </ListItem>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </List>
      )}
    </Droppable>
  )
}
