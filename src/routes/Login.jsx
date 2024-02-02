import SignupForm from '../components/form/SignupForm'
import LoginForm from '../components/form/LoginForm'
import { signup, login } from '../requests/axios'

const Login = () => {

  return (
    <>
      <section className='flex h-screen justify-center items-center'>
        <div className='w-1/2 flex flex-row shadow-xl p-20'>
          <SignupForm request={(username, email, password, password2) =>
            signup(username, email, password, password2)} />
          <LoginForm request={(email, password) => login(email, password)} />
        </div>
      </section>
    </>
  )
}

export default Login