import { useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import List from '../components/ui/List'

type Quote = {
    id: string
    text: string
    author?: string
}

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')

    const isEmpty = quotes.length === 0

    const canAdd = text.trim().length > 0

    const addQuote = () => {
        const cleaned = text.trim()
        if (!cleaned) return

        const newQuote: Quote = {
            id: crypto.randomUUID(),
            text: cleaned,
            author: author.trim() ? author.trim() : undefined,
        }

        setQuotes((prev) => [newQuote, ...prev])
        setText('')
        setAuthor('')
    }

    return (
        <div className="page page--quotes">
            <h1>Quotes</h1>

            <Card title="Add a quote">
                <div className="quotes-form">
                    <label className="quotes-form__label">
                        Quote
                        <textarea
                            className="quotes-form__input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                            placeholder="Type a quote..."
                        />
                    </label>

                    <label className="quotes-form__label">
                        Author (optional)
                        <input
                            className="quotes-form__input"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="e.g., Ricky Bobby"
                        />
                    </label>

                    <div className="quotes-form__actions">
                        <Button type="button" onClick={addQuote} disabled={!canAdd}>
                            Add quote
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setText('')
                                setAuthor('')
                            }}
                            disabled={!text && !author}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </Card>

            <Card title="Your quotes">
                {isEmpty ? (
                    <p className="muted">No quotes yet. Add your first quote above.</p>
                ) : (
                    <List>
                        {quotes.map((q) => (
                            <li key={q.id} className="quote-item">
                                <blockquote className="quote-item__text">“{q.text}”</blockquote>
                                {q.author ? <p className="quote-item__author">— {q.author}</p> : null}
                            </li>
                        ))}
                    </List>
                )}
            </Card>
        </div>
    )
}
