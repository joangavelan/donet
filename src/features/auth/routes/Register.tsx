import { Layout, AuthForm } from '../components'

export const Register = () => {
  return (
    <Layout title='Register your account'>
      <AuthForm
        googleAuthButtonText='Sign up with Google'
        submitButtonText='Sign Up'
        question='Already have an account?'
        link={{ text: 'Sign in', href: '../login' }}
      />
    </Layout>
  )
}
