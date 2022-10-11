import { Layout, AuthForm, Redirects, Header } from '../components'

export const Register = () => {
  return (
    <Layout title='Register'>
      <Header title='Register your account' />
      <AuthForm method='signUp' submitButtonText='Sign Up' />
      <Redirects
        question='Already have an account?'
        toggleLink={{ text: 'Sign in', href: '../login' }}
      />
    </Layout>
  )
}
