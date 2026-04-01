import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <main>
            <h1>Build Project</h1>
            <ul>
                <li><Link to="/tic-tac-toe">Go to Tic Tac Toe</Link></li>
                <li><Link to="/quotes">Go to Quotes</Link></li>
            </ul>
        </main>
    )
}
