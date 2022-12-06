import { Box, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DeleteTemplateMenuItem } from './DeleteTemplateMenuItem'
import { EditTemplateMenuItem } from './EditTemplateMenuItem'

type TemplateOptionsProps = {
  templateId: number
  templateName: string
}

export const TemplateOptions = ({ templateId, templateName }: TemplateOptionsProps) => {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<BsThreeDotsVertical />}
          size={{ base: 'sm', md: 'xs' }}
        />
        <MenuList>
          <EditTemplateMenuItem templateId={templateId} templateName={templateName} />
          <DeleteTemplateMenuItem templateId={templateId} />
        </MenuList>
      </Menu>
    </Box>
  )
}
