import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ListMovies from './components/ListMovies.jsx'
import Movie from './components/Movie.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/search",
    element: <ListMovies />
  },
  {
    path:"/movie/:id",
    element: <Movie />
  }
])
//Na produção o strictmode é retirado fazendo com que não ocorra duas requisições
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <RouterProvider router={router}/>
  </StrictMode>,
)