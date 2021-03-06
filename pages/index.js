import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import getAnalyticsInstance from '../helpers'

const analytics = getAnalyticsInstance()

const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  const checkSession = useCallback(() => {
    if (localStorage.getItem('credential')) {
      router.replace('/home')
    }
  }, [router])

  const submit = () => {
    localStorage.setItem('credential', JSON.stringify({
      username,
      password
    }))

    analytics.identify({
      userId: username
    })

    analytics.track({
      userId: username,
      event: 'Log In',
      properties: {
        username,
        date: (new Date()).toString()
      }
    })

    router.replace('/home')
  }

  useEffect(() => {
    checkSession()
  }, [checkSession])

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
        onChange={({target: {value}}) => setUsername(value)}
        placeholder='Username'
        style={{
          width: 250
        }}
        value={username}
      />

      <input
        onChange={({target: {value}}) => setPassword(value)}
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
      />
    </div>
  )
}

export default Login