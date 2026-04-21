import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
    return <button className={`ui-button ui-button--${variant} ${className}`.trim()} {...props} />
}
