import { NavLink } from 'react-router-dom'
import Card from '../components/ui/Card'

export default function NotFoundPage() {
    return (
        <div className="page page--not-found">
            <h1>404</h1>

            <Card title="Page not found">
                <p className="muted">
                    Sorry, that page doesn't exist.
                </p>

                <p style={{ marginTop: 12 }}>
                    <NavLink to="/">Go back home</NavLink>
                </p>
            </Card>
        </div>
    )
}
