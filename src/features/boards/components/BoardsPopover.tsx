import { ColorModeToggle } from '@/components/Elements'
import {
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Grid,
  Box,
  Text,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { BoardList } from './BoardList'
import { CreateBoardIcon } from './CreateBoardIcon'
import { RiArrowDownSLine } from 'react-icons/ri'

type BoardsPopoverProps = {
  boardTitle: string
}

export const BoardsPopover = ({ boardTitle }: BoardsPopoverProps) => {
  return (
    <Box display={{ base: 'block', lg: 'none' }}>
      <Popover>
        <PopoverTrigger>
          <Button variant='unstyled' display='flex' gap={1}>
            <Text
              as='h1'
              fontSize={{ base: '1.25rem', lg: '2xl' }}
              fontWeight='semibold'
              textTransform='capitalize'
              maxW={170}
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              overflow='hidden'
            >
              {boardTitle}
            </Text>
            <Icon
              as={RiArrowDownSLine}
              color={useColorModeValue('#DE6A1F', '#FBD28D')}
              boxSize={5}
              display={{ base: 'block', lg: 'none' }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent left='8%'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <HStack overflow='hidden'>
              <NavLink to='/boards'>
                <Text as='h2' fontWeight='semibold' _hover={{ color: 'orange.400' }}>
                  BOARDS
                </Text>
              </NavLink>

              <CreateBoardIcon />
            </HStack>
          </PopoverHeader>
          <PopoverBody>
            <Grid gap={8} py={2} gridTemplateRows={'200px auto'}>
              <BoardList />
              <ColorModeToggle />
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
