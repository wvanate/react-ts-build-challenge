import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import TicTacToePage from './pages/TicTacToePage'
import QuotesPage from './pages/QuotesPage'
import './App.css'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

type Theme = 'light' | 'dark'

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark') // default to dark to match your current look

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="app">
      <NavBar theme={theme} onToggleTheme={toggleTheme} />

      <main className="app__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tic-tac-toe" element={<TicTacToePage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* Below reroutes to home on any uknown route */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          {/* Below reroutes to NotFoundPage "404" on any unknown route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
