import * as React from 'react'
import { Grid, useDisclosure } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { AppFeatures } from '@/features/misc/components'
import { Modal } from '../Elements'
import { useUser } from '@/features/auth/hooks'
import { useQueryClient } from '@tanstack/react-query'

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen: openWelcomeModal, onClose } = useDisclosure()
  const queryClient = useQueryClient()
  const userFullName = useUser().user_metadata.full_name as string
  const isNewUser = queryClient.getQueryData(['isNewUser'])

  React.useEffect(() => {
    if (isNewUser) {
      openWelcomeModal()
      queryClient.removeQueries(['isNewUser'])
    }
  }, [])

  return (
    <React.Fragment>
      <Helmet>
        <title>Donet</title>
      </Helmet>

      <Grid
        gridTemplateAreas={{
          base: `"header"
                  "main"`,
          lg: `"aside header"
                "aside main"`
        }}
        gridTemplateColumns={{ base: '1fr', lg: '370px 1fr' }}
        gridTemplateRows={'100px 1fr'}
        h='100vh'
      >
        {children}
      </Grid>

      <Modal
        title={`Welcome ${userFullName}`}
        isOpen={isOpen}
        onClose={onClose}
        topPosition='18%'
        sx={{
          header: {
            textAlign: 'center',
            fontWeight: 'semibold',
            fontSize: '2xl',
            textTransform: 'capitalize'
          },
          pt: 2,
          pb: 5
        }}
      >
        <AppFeatures onClose={onClose} />
      </Modal>
    </React.Fragment>
  )
}
