import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  const checkSession = () => {
    if (localStorage.getItem('credential')) {
      router.replace('/home')
    }
  }

  const submit = () => {
    localStorage.setItem('credential', JSON.stringify({
      username,
      password
    }))

    router.replace('/home')
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <h2>
        Login
      </h2>

      <input
        onChange={({target}) => setUsername(target.value)}
        placeholder='Username'
        style={{
          width: 250
        }}
        value={username}
      />

      <input
        onChange={({target}) => setPassword(target.value)}
        placeholder='Password'
        type='password'
        style={{
          width: 250,
          marginTop: 10
        }}
      />

      <input
        onClick={submit}
        type='button'
        value='Submit'
        style={{
          marginTop: 20,
          width: 250
        }}
      >
      </input>
    </div>
  )
}

export default Login