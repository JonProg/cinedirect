import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ListMovies from './components/ListMovies.jsx'
import Movie from './components/Movie.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<ListMovies />} />
        <Route path="/players/:type/:id" element={<Movie />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
