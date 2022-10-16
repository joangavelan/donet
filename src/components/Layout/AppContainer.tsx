import { Grid } from '@chakra-ui/react'

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      gridTemplateAreas={`"aside header"
                          "aside main"`}
      gridTemplateColumns={'minmax(30%, 400px) 1fr'}
      gridTemplateRows={'100px 1fr'}
      h='100vh'
    >
      {children}
    </Grid>
  )
}
