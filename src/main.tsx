import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0WithNavigate } from './Auth0WithNavigate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0WithNavigate>
        <App />
      </Auth0WithNavigate>
    </BrowserRouter>
  </StrictMode>,
)
