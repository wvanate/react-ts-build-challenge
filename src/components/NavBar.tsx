import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'
import type { RootState, AppDispatch } from '../store/store'

export default function NavBar() {
    const theme = useSelector((state: RootState) => state.theme.value)
    const dispatch = useDispatch<AppDispatch>()

    const linkClassName = ({ isActive }: { isActive: boolean }) =>
        isActive ? 'nav__link nav__link--active' : 'nav__link'

    return (
        <header className="nav">
            <nav className="nav__links">
                <NavLink to="/" end className={linkClassName}>Home</NavLink>
                <NavLink to="/tic-tac-toe" className={linkClassName}>Tic Tac Toe</NavLink>
                <NavLink to="/quotes" className={linkClassName}>Quotes</NavLink>
                <NavLink to="/search" className={linkClassName}>Search</NavLink>
            </nav>

            <button type="button" className="nav__button" onClick={() => dispatch(toggleTheme())}>
                Theme: {theme}
            </button>
        </header>
    )
}
