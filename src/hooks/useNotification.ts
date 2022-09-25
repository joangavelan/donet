import { useToast, UseToastOptions } from '@chakra-ui/react'

type Notification = {
  type: UseToastOptions['status']
  message: string
}

export const useNotification = () => {
  const defaultOptions: UseToastOptions = {
    duration: 4000,
    isClosable: true,
    position: 'bottom-right'
  }

  const toast = useToast(defaultOptions)

  return ({ type, message }: Notification) =>
    toast({ status: type, description: message })
}
