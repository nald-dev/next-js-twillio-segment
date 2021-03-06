import { useCallback, useEffect } from 'react'
import { useRouter } from "next/router"

import getAnalyticsInstance from '../../helpers'

const analytics = getAnalyticsInstance()

const AnotherPage = () => {
    const router = useRouter()

    const checkSession = useCallback(() => {
        if(!localStorage.getItem('credential')) {
            router.replace('/')
        } else {
            const { username } = JSON.parse(localStorage.getItem('credential'))

            analytics.page({
                userId: username,
                name: 'another-page'
            })
        }
    }, [router])

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
            Another Page
        </div>
    )
}

export default AnotherPage