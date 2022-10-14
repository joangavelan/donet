import { DefaultOptions, QueryClient } from 'react-query'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'

const defaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity
  }
}

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage
})

export const queryClient = new QueryClient({ defaultOptions })

void persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: 1000 * 60 * 60 * 24
})
