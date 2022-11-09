import { Button, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'

const features = [
  'Create your own boards',
  'Add templates to group your tasks',
  'Add tasks to your different templates',
  'Add subtasks within your tasks',
  'Check off your subtasks as you complete them',
  'Drag and drop your tasks between templates'
]

type AppFeaturesProps = {
  onClose: () => void
}

export const AppFeatures = ({ onClose }: AppFeaturesProps) => {
  return (
    <Flex direction='column' gap={4}>
      <Text>In this app you will be able to:</Text>
      <UnorderedList lineHeight={1.7}>
        {features.map((feature, index) => (
          <ListItem key={index}>{feature}</ListItem>
        ))}
      </UnorderedList>
      <Button colorScheme='orange' onClick={onClose} mt={2} alignSelf='center'>
        Continue
      </Button>
    </Flex>
  )
}
