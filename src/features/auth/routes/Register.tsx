import { Layout, AuthForm } from '../components'

export const Register = () => {
  return (
    <Layout title='Register your account'>
      <AuthForm
        method='signUp'
        submitButtonText='Sign Up'
        question='Already have an account?'
        toggleLink={{ text: 'Sign in', href: '../login' }}
      />
    </Layout>
  )
}
