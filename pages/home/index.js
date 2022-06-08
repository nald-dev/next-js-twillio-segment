import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = () => {
    const router = useRouter()

    const checkSession = useCallback(() => {
        if(!localStorage.getItem('credential')) {
            router.replace('/')
        } else {
            const credential = JSON.parse(localStorage.getItem('credential'))

            alert(JSON.stringify(credential, null, 2))
        }
    }, [router])

    const logout = () => {
        localStorage.removeItem('credential')

        router.replace('/')
    }

    useEffect(() => {
        checkSession()
    }, [checkSession])

    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                justifyContent: 'center',
                width: '100vw'
            }}
        >
            You have successfully logged in

            <input
                onClick={logout}
                type='button'
                value='Log out'
                style={{
                    marginTop: 20
                }}
            />
        </div>
    )
}

// AoKlj2CmD4W78Av3gEsZn7B6CcrcvcoE

export default Home