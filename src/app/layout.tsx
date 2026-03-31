import './globals.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

import { auth } from '@/auth/auth'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { siteConfig } from '@/config/siteConfig'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const session = await auth()

    return (
        <html lang="en" className={inter.className}>
            <body>
                <SessionProvider session={session}>
                    <Header />
                    {children}
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    )
}
