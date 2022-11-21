import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { theme } from '@/theme'
import { HelmetProvider } from 'react-helmet-async'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/react-query'
import { DndContext } from '@/features/tasks/components'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <DndContext>
            <Router>{children}</Router>
          </DndContext>

          <ReactQueryDevtools position='bottom-right' />
        </QueryClientProvider>
      </HelmetProvider>
    </ChakraProvider>
  )
}
