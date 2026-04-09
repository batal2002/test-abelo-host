'use client'
import { useSession } from 'next-auth/react'

import s from './Footer.module.scss'

const year = new Date().getFullYear()

export const Footer = () => {
    const { data } = useSession()
    const email = data?.user?.email
    return (
        <div className={s.container}>
            <footer className={`${s.footer} section-container-md`}>
                <span>{year}</span>
                {email && <span>Logged as {email}</span>}
            </footer>
        </div>
    )
}
