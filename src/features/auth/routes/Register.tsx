import { Layout, Redirects, Header, RegisterForm } from '../components'

export const Register = () => {
  return (
    <Layout title='Register'>
      <Header title='Register your account' />
      <RegisterForm />
      <Redirects
        question='Already have an account?'
        link={{ text: 'Sign in', href: '/auth/login' }}
      />
    </Layout>
  )
}
