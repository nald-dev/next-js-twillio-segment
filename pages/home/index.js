import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import getAnalyticsInstance from '../../helpers'

const analytics = getAnalyticsInstance()

const Home = () => {
    const router = useRouter()

    const checkSession = useCallback(() => {
        if(!localStorage.getItem('credential')) {
            router.replace('/')
        } else {
            const { username } = JSON.parse(localStorage.getItem('credential'))

            analytics.page({
                userId: username,
                name: 'home'
            })
        }
    }, [router])

    const goToAnotherPage = () => {
        router.push('/another-page')
    }

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

            <div
                style = {{
                    display: 'flex',
                    marginTop: 20
                }}
            >
                <input
                    onClick={goToAnotherPage}
                    type='button'
                    value='Go To Another Page'
                />

                <div
                    style={{
                        width: 20
                    }}
                />

                <input
                    onClick={logout}
                    type='button'
                    value='Log Out'
                />
            </div>
        </div>
    )
}

export default Home