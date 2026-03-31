import Link from 'next/link'

import s from './not-found.module.scss'

export default function NotFound() {
    return (
        <div className={`${s.root} section-container-md`}>
            <h2 className={s.title}>Not Found</h2>
            <p className={s.text}>Could not find requested resource</p>
            <Link className={s.link} href="/">
                Return Home
            </Link>
        </div>
    )
}
