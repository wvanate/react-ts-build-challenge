import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import TicTacToePage from './pages/TicTacToePage'
import QuotesPage from './pages/QuotesPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

export default function App() {
  const theme = useSelector((state: RootState) => state.theme.value)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="app">
      <NavBar />

      <main className="app__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tic-tac-toe" element={<TicTacToePage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
