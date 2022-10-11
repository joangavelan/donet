import { Layout, AuthForm, Redirects, Header } from '../components'

export const Login = () => {
  return (
    <Layout title='Login'>
      <Header title='Login to your account' />
      <AuthForm method='signIn' submitButtonText='Sign In' />
      <Redirects
        question="Don't have an account?"
        toggleLink={{ text: 'Sign up', href: '../register' }}
      />
    </Layout>
  )
}
