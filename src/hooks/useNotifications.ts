import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useNotifications = () => {
  const defaultOptions: UseToastOptions = {
    duration: 4000,
    isClosable: true,
    position: 'bottom-right'
  }

  const toast = useToast(defaultOptions)

  return (type: UseToastOptions['status'], message: string) =>
    toast({ status: type, description: message })
}
