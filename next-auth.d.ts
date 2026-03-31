import { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        accessToken: string
        user: {
            firstName: string
            lastName: string
        } & DefaultSession['user']
    }

    interface User {
        accessToken: string
        refreshToken: string
        accessTokenExpires: number
        firstName: string
        lastName: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string
        refreshToken: string
        accessTokenExpires: number
        firstName: string
        lastName: string
    }
}
