import { redirect } from 'next/navigation'

import { auth } from '@/auth/auth'

import s from './page.module.scss'
import { LoginForm } from './ui/LoginForm'

export default async function AuthPage() {
    const session = await auth()

    if (session) redirect('/')

    return (
        <div className={`${s.page} section-container-md`}>
            <div className={s.card}>
                <h1 className={s.title}>Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
