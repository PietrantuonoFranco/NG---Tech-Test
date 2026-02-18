import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CandidateProvider } from './contexts/CandidateProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CandidateProvider>
      <App />
    </CandidateProvider>
  </StrictMode>,
)
