import type { DefaultOptions } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const defaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity
  }
}

export const queryClient = new QueryClient({ defaultOptions })

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage
})

persistQueryClient({
  queryClient,
  persister: localStoragePersister
})
