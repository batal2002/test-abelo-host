'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'

import s from './LoginForm.module.scss'

interface FieldErrors {
    username?: string
    password?: string
}

const validate = (username: string, password: string): FieldErrors => {
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
            <FormField
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                disabled={isSubmitting}
                error={fieldErrors.username}
            />

            <FormField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                disabled={isSubmitting}
                error={fieldErrors.password}
            />

            {formError && <div className={s.formError}>{formError}</div>}

            <Button className={s.button} type="submit" isLoading={isSubmitting} loadingText="Logging in...">
                Login
            </Button>
        </form>
    )
}
