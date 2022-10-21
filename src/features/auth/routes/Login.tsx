import { Layout, Redirects, Header, LoginForm } from '../components'

export const Login = () => {
  return (
    <Layout title='Login'>
      <Header title='Login to your account' />
      <LoginForm />
      <Redirects
        question="Don't have an account?"
        toggleLink={{ text: 'Sign up', href: '/auth/register' }}
      />
    </Layout>
  )
}
