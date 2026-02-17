import { useState } from 'react'
import '../styles/GetCandidateData.css'
import { validateEmail } from '../lib/utils/validateEmail'

function GetCandidateData() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const trimmedEmail = email.trim()

    // Validar que el email no esté vacío
    if (!trimmedEmail) {
      setError('Please enter an email address')
      return
    }

    // Validar que el email tenga un formato válido
    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address')
      return
    }

    // Si todo es válido, enviar
    setError('')
    setSubmitted(true)
    setEmail('')
    
    // Resetear después de 3 segundos
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <>
      <div className="text-container">
        <div className="email-svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.425 11.9q.275.2.575.2t.575-.2L21 7.425V5l-7 4.85L7 5v2.425zM3 21q-.825 0-1.412-.587T1 19V7.5q0-.425.288-.712T2 6.5t.713.288T3 7.5V19h15.5q.425 0 .713.288T19.5 20t-.288.713T18.5 21zm4-4q-.825 0-1.412-.587T5 15V5q0-.825.588-1.412T7 3h14q.825 0 1.413.588T23 5v10q0 .825-.587 1.413T21 17z" />
          </svg>
        </div>

        <h1>Job Application Portal</h1>
        <p>Enter the email you registered with to view open positions and submit your application.</p>
      </div>
      
      <form onSubmit={handleApplication}>
        <div>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            disabled={submitted}
            required
          />
          <button
            type="submit"
            disabled={!email.trim() || submitted}
            className="submit-button"
          >
            { submitted ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                  <polyline fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" points="2.75 8.75 6.25 12.25 13.25 4.75" />
                </svg>
              :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 10l-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z" />
                </svg>
            }
          </button>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '0.9rem',
            fontWeight: '500',
            animation: 'fadeIn 200ms ease-out'
          }}>
            {error}
          </div>
        )}

        {submitted && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '6px',
            color: '#059669',
            fontSize: '0.9rem',
            fontWeight: '500',
            animation: 'fadeIn 200ms ease-out'
          }}>
            Application submitted successfully for {email}
          </div>
        )}
      </form>
    </>
  )
}

export default GetCandidateData