import s from './page.module.scss'
import { LoginForm } from './ui/LoginForm'

export default async function AuthPage() {
    // if (session) redirect('/')

    return (
        <div className={`${s.page} section-container-md`}>
            <div className={s.card}>
                <h1 className={s.title}>Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
