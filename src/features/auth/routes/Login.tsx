import { Layout, AuthForm, Redirects } from '../components'

export const Login = () => {
  return (
    <Layout title='Log in to your account'>
      <AuthForm method='signIn' submitButtonText='Sign In' />
      <Redirects
        question="Don't have an account?"
        toggleLink={{ text: 'Sign up', href: '../register' }}
      />
    </Layout>
  )
}
