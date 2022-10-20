import { Grid } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      gridTemplateAreas={`"aside header"
                          "aside main"`}
      gridTemplateColumns={'minmax(30%, 400px) 1fr'}
      gridTemplateRows={'100px 1fr'}
      h='100vh'
    >
      <Helmet>
        <title>Donet</title>
      </Helmet>

      {children}
    </Grid>
  )
}
