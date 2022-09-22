import { supabase } from '@/lib/supabase'
import { Box, Text, ListItem, UnorderedList } from '@chakra-ui/react'

export const Welcome = () => {
  const user = supabase.auth.user()

  return (
    <Box>
      <Text lineHeight={2}>
        Welcome to{' '}
        <Text as='span' fontWeight='semibold'>
          Donet
        </Text>
        , your centralized task management app.
      </Text>

      <Text lineHeight={2}>
        You are now logged in as{' '}
        <Text as='span' fontWeight='semibold'>
          {user?.email}
        </Text>
        .
      </Text>

      <Text lineHeight={2} my={1.5}>
        In this app you are able to:
      </Text>

      <UnorderedList lineHeight={1.7}>
        <ListItem>Create your own boards.</ListItem>
        <ListItem>Add tasks to your different boards.</ListItem>
        <ListItem>Create columns to group your tasks.</ListItem>
        <ListItem>Add subtasks.</ListItem>
        <ListItem>Set the priority of your tasks.</ListItem>
        <ListItem>Mark your tasks and subtasks as you complete them.</ListItem>
        <ListItem>Drag and drop your tasks between columns.</ListItem>
      </UnorderedList>
    </Box>
  )
}
