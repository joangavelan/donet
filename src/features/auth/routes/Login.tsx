import { Layout, AuthForm } from '../components'

export const Login = () => {
  return (
    <Layout title='Log in to your account'>
      <AuthForm
        googleAuthButtonText='Continue with Google'
        submitButtonText='Sign In'
        question="Don't have an account?"
        link={{ text: 'Sign up', href: '../register' }}
      />
    </Layout>
  )
}
