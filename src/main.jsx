import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ListMovies from './components/ListMovies.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/search",
    element: <ListMovies />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)