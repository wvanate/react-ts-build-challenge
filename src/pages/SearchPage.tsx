import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/ui/Card'
import List from '../components/ui/List'
import { http } from '../api/http'

type Resource = 'books' | 'characters' | 'houses' | 'spells'

const RESOURCE_LABEL: Record<Resource, string> = {
    books: 'Books',
    characters: 'Characters',
    houses: 'Houses',
    spells: 'Spells',
}

type PotterCharacter = {
    fullName: string
    nickname: string
    hogwartsHouse: string
    interpretedBy: string
    children: string[]
    image: string
    birthdate: string
    index: number
}

type PotterBook = {
    number: number
    title: string
    originalTitle: string
    releaseDate: string
    description: string
    pages: number
    cover: string
    index: number
}

type PotterHouse = {
    house: string
    emoji: string
    founder: string
    colors: string[]
    animal: string
    index: number
}

type PotterSpell = {
    spell: string
    use: string
    index: number
}

type ResourceDataMap = {
    characters: PotterCharacter[]
    books: PotterBook[]
    houses: PotterHouse[]
    spells: PotterSpell[]
}

async function fetchPotter<R extends Resource>(resource: R): Promise<ResourceDataMap[R]> {
    const res = await http.get<ResourceDataMap[R]>(`/en/${resource}`)
    return res.data
}

function matchesQuery(obj: Record<string, unknown>, q: string) {
    return Object.values(obj).some((v) => {
        if (typeof v === 'string') return v.toLowerCase().includes(q)
        if (Array.isArray(v)) return v.some((x) => typeof x === 'string' && x.toLowerCase().includes(q))
        return false
    })
}

export default function SearchPage() {
    const [resource, setResource] = useState<Resource>('characters')
    const [query, setQuery] = useState('')
    const [touched, setTouched] = useState(false)

    const PAGE_SIZE = 6
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

    const trimmed = query.trim()

    useEffect(() => {
        setVisibleCount(PAGE_SIZE)
    }, [resource, trimmed])

    const shouldShowResults = trimmed.length > 0
    const showError = touched && !shouldShowResults

    const { data, isLoading, isError, error, isSuccess, isFetching } = useQuery({
        queryKey: ['potter', 'en', resource],
        queryFn: () => fetchPotter(resource),
    })

    const results = useMemo(() => {
        if (!data) return []
        if (!shouldShowResults) return []

        const q = trimmed.toLowerCase()
        return (data as unknown as Record<string, unknown>[]).filter((item) => matchesQuery(item, q))
    }, [data, shouldShowResults, trimmed])

    const shownResults = results.slice(0, visibleCount)
    const canShowMore = shownResults.length < results.length

    return (
        <div className="page page--search">
            <h1>Search</h1>

            <Card title="Potter API Search">
                <label className="search-form__label" htmlFor="resourceSelect">
                    Dataset
                </label>
                <select
                    id="resourceSelect"
                    className="search-form__input"
                    value={resource}
                    onChange={(e) => setResource(e.target.value as Resource)}
                >
                    {(Object.keys(RESOURCE_LABEL) as Resource[]).map((r) => (
                        <option key={r} value={r}>
                            {RESOURCE_LABEL[r]}
                        </option>
                    ))}
                </select>

                <label className="search-form__label" htmlFor="searchQuery">
                    Search
                </label>
                <input
                    id="searchQuery"
                    className={`search-form__input ${showError ? 'search-form__input--error' : ''}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // typing
                    onFocus={() => { /* focus event (optional behavior) */ }}
                    onBlur={() => setTouched(true)} // blur
                    placeholder={`Type to search ${RESOURCE_LABEL[resource].toLowerCase()}...`}
                    autoComplete="off"
                />

                {showError ? (
                    <p className="search-form__error">
                        Please enter at least 1 non-whitespace character.
                    </p>
                ) : null}

                {isLoading ? <p className="muted">Loading {RESOURCE_LABEL[resource]}…</p> : null}
                {isFetching && !isLoading ? <p className="muted">Refreshing…</p> : null}

                {isError ? (
                    <p className="search-form__error">
                        {(error as Error).message || 'Request failed.'}
                    </p>
                ) : null}
            </Card>

            <Card title={shouldShowResults ? `Results (${results.length})` : 'Results'}>
                {!shouldShowResults ? (
                    <p className="muted">Enter a search term to see results.</p>
                ) : !isSuccess ? (
                    <p className="muted">Waiting for data…</p>
                ) : results.length === 0 ? (
                    <p className="muted">No matches.</p>
                ) : (
                    <>
                        <List>
                            {resource === 'characters' &&
                                (shownResults as unknown as PotterCharacter[]).map((c) => (
                                    <li key={c.index} className="search-result">
                                        {c.image ? (
                                            <div className="search-result__media">
                                                <img src={c.image} alt={c.fullName} loading="lazy" />
                                            </div>
                                        ) : (
                                            <div className="search-result__media" />
                                        )}

                                        <div className="search-result__content">
                                            <h2 className="search-result__title" style={{ marginBottom: 6 }}>
                                                {c.fullName}
                                                {c.nickname ? <span className="muted"> (“{c.nickname}”)</span> : null}
                                            </h2>

                                            <p className="search-result__desc" style={{ marginBottom: 6 }}>
                                                <strong>House:</strong> {c.hogwartsHouse || '(unknown)'} ·{' '}
                                                <strong>Actor:</strong> {c.interpretedBy || '(unknown)'}
                                            </p>

                                            <p className="muted" style={{ marginBottom: 0 }}>
                                                <strong>Birthdate:</strong> {c.birthdate || '(unknown)'} ·{' '}
                                                <strong>Children:</strong>{' '}
                                                {c.children?.length ? c.children.join(', ') : '(none)'}
                                            </p>
                                        </div>
                                    </li>

                                ))}

                            {resource === 'books' &&
                                (shownResults as unknown as PotterBook[]).map((b) => (
                                    <li key={b.index} className="search-result">
                                        {b.cover ? (
                                            <div className="search-result__media">
                                                <img src={b.cover} alt={b.title} loading="lazy" />
                                            </div>
                                        ) : (
                                            <div className="search-result__media" />
                                        )}

                                        <div className="search-result__content">
                                            <h2 className="search-result__title" style={{ marginBottom: 6 }}>
                                                #{b.number} - {b.title}
                                            </h2>

                                            <p className="search-result__desc" style={{ marginBottom: 6 }}>
                                                <strong>Release:</strong> {b.releaseDate} · <strong>Pages:</strong> {b.pages}
                                            </p>

                                            <p className="muted" style={{ margin: 0 }}>
                                                {b.description}
                                            </p>
                                        </div>
                                    </li>

                                ))}

                            {resource === 'houses' &&
                                (shownResults as unknown as PotterHouse[]).map((h) => (
                                    <li key={h.index} className="search-result">
                                        <div className="search-result__media search-result__media--emoji" aria-hidden="true">
                                            {h.emoji || '🏰'}
                                        </div>

                                        <div className="search-result__content">
                                            <h2 className="search-result__title" style={{ marginBottom: 6 }}>
                                                {h.house}
                                            </h2>

                                            <p className="search-result__desc" style={{ marginBottom: 6 }}>
                                                <strong>Founder:</strong> {h.founder} · <strong>Animal:</strong> {h.animal}
                                            </p>

                                            <p className="muted" style={{ margin: 0 }}>
                                                <strong>Colors:</strong> {h.colors.join(', ')}
                                            </p>
                                        </div>
                                    </li>
                                ))}

                            {resource === 'spells' &&
                                (shownResults as unknown as PotterSpell[]).map((s) => (
                                    <li key={s.index} className="search-result search-result--no-media">
                                        <div className="search-result__content">
                                            <h2 className="search-result__title" style={{ marginBottom: 6 }}>
                                                {s.spell}
                                            </h2>
                                            <p className="search-result__desc" style={{ margin: 0 }}>
                                                {s.use}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                        </List>
                        {canShowMore ? (
                            <button
                                type="button"
                                className="btn btn--show-more"
                                style={{ marginTop: 12 }}
                                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                            >
                                Show more
                            </button>
                        ) : null}
                    </>
                )}
            </Card>
        </div>
    )
}
