import { useMemo, useState } from 'react'
import Card from '../components/ui/Card'
import List from '../components/ui/List'
import Button from '../components/ui/Button'

type Item = {
    id: string
    title: string
    description: string
}

/** In-memory data (no API) */
const ITEMS: Item[] = [
    { id: '1', title: 'Tic Tac Toe', description: 'A simple React game using state and events.' },
    { id: '2', title: 'Quotes', description: 'A page that lists and adds quotes with a form.' },
    { id: '3', title: 'React Router', description: 'Client-side routing for multi-page UX.' },
    { id: '4', title: 'useState', description: 'Local component state that triggers UI updates.' },
    { id: '5', title: 'useEffect', description: 'Sync side effects with changes in state/props.' },
]

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [touched, setTouched] = useState(false)
    const [submittedQuery, setSubmittedQuery] = useState<string | null>(null)

    const trimmed = query.trim()
    const isValid = trimmed.length > 0

    const showError = (touched || submittedQuery !== null) && !isValid

    const results = useMemo(() => {
        // Live filtering: UI updates immediately while typing
        if (!trimmed) return ITEMS

        const q = trimmed.toLowerCase()
        return ITEMS.filter((item) => {
            return (
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q)
            )
        })
    }, [trimmed])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isValid) {
            // Prevent invalid submit + show feedback
            setTouched(true)
            setSubmittedQuery('') // marks that user attempted submit
            return
        }

        setSubmittedQuery(trimmed)
    }

    return (
        <div className="page page--search">
            <h1>Search</h1>

            <Card title="Search the library">
                <form onSubmit={handleSubmit} className="search-form">
                    <label className="search-form__label" htmlFor="searchQuery">
                        Search:
                    </label>

                    <input
                        id="searchQuery"
                        className={`search-form__input ${showError ? 'search-form__input--error' : ''}`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}          // typing event
                        onFocus={() => { /* focusing event */ }}            // focus event
                        onBlur={() => setTouched(true)}                     // blur event
                        placeholder="Try: react, quotes, useState..."
                        autoComplete="off"
                    />

                    {showError ? (
                        <p className="search-form__error">
                            Please enter at least 1 non‑whitespace character.
                        </p>
                    ) : null}

                    <div className="search-form__actions">
                        <Button type="submit">Submit</Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setQuery('')
                                setTouched(false)
                                setSubmittedQuery(null)
                            }}
                            disabled={!query && submittedQuery === null}
                        >
                            Clear
                        </Button>
                    </div>

                    {submittedQuery ? (
                        <p className="muted">Submitted: “{submittedQuery}”</p>
                    ) : null}
                </form>
            </Card>

            <Card title={`Results (${results.length})`}>
                {results.length === 0 ? (
                    <p className="muted">No matches. Try a different search.</p>
                ) : (
                    <List>
                        {results.map((item) => (
                            <li key={item.id} className="search-result">
                                <h2 className="search-result__title">{item.title}</h2>
                                <p className="search-result__desc">{item.description}</p>
                            </li>
                        ))}
                    </List>
                )}
            </Card>
        </div>
    )
}
