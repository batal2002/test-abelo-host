'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'

import s from './LoginButton.module.scss'

export const LoginButton = () => {
    const { status, data } = useSession()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await signOut()
        setIsLoggingOut(false)
    }

    if (status === 'loading') {
        return <Spinner size={'sm'} color={'light'} />
    }

    if (status === 'authenticated' && data) {
        return (
            <div className={s.wrapper}>
                <div className={s.user}>
                    {data.user?.image && <Image src={data.user?.image} alt={'avatar'} width={30} height={30} />}
                    <span>
                        {data.user.firstName} {data.user.lastName}
                    </span>
                </div>
                <Button onClick={handleLogout} isLoading={isLoggingOut} loadingText="Logging out...">
                    Logout
                </Button>
            </div>
        )
    }

    return (
        <Link className={s.link} href="/auth">
            <Image src={'icons/user.svg'} alt={'avatar'} width={20} height={20} />
            <span>Login</span>
        </Link>
    )
}
