import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export default function List({ children }: Props) {
    return <ul className="ui-list">{children}</ul>
}
