import { redirect } from 'next/navigation'

import { LoginForm } from '@/features/auth'
import { auth } from '@/shared/auth/auth'

import s from './page.module.scss'

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
