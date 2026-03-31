'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormEvent, useMemo, useState } from 'react'

import s from './LoginForm.module.scss'

type FieldErrors = {
    username?: string
    password?: string
}

function validate(username: string, password: string): FieldErrors {
    const errors: FieldErrors = {}

    const u = username.trim()
    const p = password.trim()

    if (!u) errors.username = 'Username is required'
    else if (u.length < 3) errors.username = 'Minimum 3 characters'

    if (!p) errors.password = 'Password is required'
    else if (p.length < 3) errors.password = 'Minimum 3 characters'

    return errors
}

export const LoginForm = () => {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
    const [formError, setFormError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const canSubmit = useMemo(() => !isSubmitting, [isSubmitting])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormError(null)

        const errors = validate(username, password)
        setFieldErrors(errors)
        if (Object.keys(errors).length > 0) return

        setIsSubmitting(true)
        try {
            const result = await signIn('credentials', {
                redirect: false,
                username: username.trim(),
                password: password.trim(),
            })

            if (!result || result.error) {
                setFormError('Invalid username or password')
                return
            }

            router.replace('/')
        } catch {
            setFormError('Login failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className={s.form} onSubmit={onSubmit} noValidate>
            <label className={s.field}>
                <span className={s.label}>Username</span>
                <input
                    className={s.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    inputMode="text"
                    placeholder="username"
                    aria-invalid={Boolean(fieldErrors.username)}
                    aria-describedby={fieldErrors.username ? 'username-error' : undefined}
                    disabled={isSubmitting}
                />
                {fieldErrors.username && (
                    <span id="username-error" className={s.error}>
                        {fieldErrors.username}
                    </span>
                )}
            </label>

            <label className={s.field}>
                <span className={s.label}>Password</span>
                <input
                    className={s.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="password"
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                    disabled={isSubmitting}
                />
                {fieldErrors.password && (
                    <span id="password-error" className={s.error}>
                        {fieldErrors.password}
                    </span>
                )}
            </label>

            {formError && <div className={s.formError}>{formError}</div>}

            <button className={s.button} type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Logging in…' : 'Login'}
            </button>
        </form>
    )
}
