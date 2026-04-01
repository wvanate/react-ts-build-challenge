import { NavLink } from 'react-router-dom'

type Theme = 'light' | 'dark'

type Props = {
    theme: Theme
    onToggleTheme: () => void
}

export default function NavBar({ theme, onToggleTheme }: Props) {
    const linkClassName = ({ isActive }: { isActive: boolean }) =>
        isActive ? 'nav__link nav__link--active' : 'nav__link'

    return (
        <header className="nav">
            <nav className="nav__links">
                <NavLink to="/" end className={linkClassName}>
                    Home
                </NavLink>

                <NavLink to="/tic-tac-toe" className={linkClassName}>
                    Tic Tac Toe
                </NavLink>

                <NavLink to="/quotes" className={linkClassName}>
                    Quotes
                </NavLink>
            </nav>

            <button type="button" className="nav__button" onClick={onToggleTheme}>
                Theme: {theme}
            </button>
        </header>
    )
}
