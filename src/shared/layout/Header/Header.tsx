import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '@/shared/config/siteConfig'

import s from './Header.module.scss'
import { LoginButton } from './LoginButton'

export const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.topBar}>
                <header className={`${s.header} section-container-md`}>
                    <div className={s.social}>
                        {siteConfig.socialLinks.map(({ src, alt, href, label }) => {
                            const isExternal = href.startsWith('http')

                            return (
                                <a
                                    key={label}
                                    className={s.link}
                                    href={href}
                                    rel={isExternal ? 'noreferrer noopener' : undefined}
                                    target={isExternal ? '_blank' : undefined}
                                >
                                    <Image src={src} alt={alt} width={20} height={20} />
                                    <span className={s.linkText}>{label}</span>
                                </a>
                            )
                        })}
                    </div>
                    <LoginButton />
                </header>
            </div>
            <div className={s.brandBar}>
                <div className={`section-container-md ${s.brandInner}`}>
                    <Link className={s.brandLink} href="/">
                        <span className={s.brandTitle}>
                            {siteConfig.title} Shop<span className={s.brandDot}>.</span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
