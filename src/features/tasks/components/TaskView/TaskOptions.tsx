import type { Tasks } from '@/types'
import { Box, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DeleteTaskMenuItem } from './DeleteTaskMenuItem'
import { EditTaskMenuItem } from './EditTaskMenuItem'

type TaskOptionsProps = {
  task: Tasks['Row']
}

export const TaskOptions = ({ task }: TaskOptionsProps) => {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<BsThreeDotsVertical />}
          size={{ base: 'sm', md: 'xs' }}
        />
        <MenuList>
          <EditTaskMenuItem task={task} />
          <DeleteTaskMenuItem taskId={task.id} />
        </MenuList>
      </Menu>
    </Box>
  )
}
