import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

import { publicApi } from '@/shared/api/publicApi'

interface LoginResponse {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
}

const expiresInMins = 30

async function refreshAccessToken(token: JWT) {
    try {
        if (!token?.refreshToken) return token

        const { data } = await publicApi.post<LoginResponse>(
            '/auth/refresh',
            { refreshToken: token.refreshToken, expiresInMins },
            { withCredentials: true },
        )

        return {
            ...token,
            accessToken: data.accessToken ?? token.accessToken,
            refreshToken: data.refreshToken ?? token.refreshToken,
            accessTokenExpires: Date.now() + expiresInMins * 60 * 1000,
        }
    } catch {
        return null
    }
}

const nextAuthSecret = process.env.NEXTAUTH_SECRET ?? 'dev-secret'
if (process.env.NODE_ENV === 'production' && nextAuthSecret === 'dev-secret') {
    console.warn('NEXTAUTH_SECRET is not set. Falling back to an insecure dev secret.')
}

export const { handlers, auth } = NextAuth({
    trustHost: true,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'emilys' },
                password: { label: 'Password', type: 'password', placeholder: 'emilyspass' },
            },
            async authorize(credentials) {
                const username = credentials?.username
                const password = credentials?.password

                if (!username || !password) return null

                try {
                    const { data } = await publicApi.post<LoginResponse>(
                        '/auth/login',
                        {
                            username,
                            password,
                            expiresInMins,
                        },
                        {
                            withCredentials: true,
                        },
                    )

                    if (!data) return null

                    return {
                        ...data,
                        id: String(data.id),
                        accessTokenExpires: Date.now() + expiresInMins * 60 * 1000,
                    }
                } catch {
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 30,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.accessTokenExpires = user.accessTokenExpires

                token.firstName = user.firstName
                token.lastName = user.lastName
            }

            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.user.firstName = token.firstName
            session.user.lastName = token.lastName
            session.accessToken = token.accessToken

            return session
        },
    },
    secret: nextAuthSecret,
})
