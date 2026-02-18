import { useState } from 'react'
import '../styles/GetCandidateData.css'
import { validateEmail } from '../lib/utils/validateEmail'
import { useCandidateContext } from '../contexts/CandidateContext'
import { fetchCandidateByEmail } from '../lib/api/fetchCandidateByEmail'
import CandidateCard from './CandidateCard'
import AlertMessage from './AlertMessage'

function GetCandidateData() {
  const [email, setEmail] = useState('')
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState('')
  const [localError, setLocalError] = useState('')
  const {
    candidate,
    loading,
    error,
    setCandidateData,
    setLoading,
    setError,
    clearCandidateData,
  } = useCandidateContext()

  const handleFetchCandidate = async (emailValue: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchCandidateByEmail(emailValue)
      setCandidateData(data)
      setLastSubmittedEmail(emailValue)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch candidate data'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setLocalError('Please enter an email address')
      return
    }

    if (!validateEmail(trimmedEmail)) {
      setLocalError('Please enter a valid email address')
      return
    }

    setLocalError('')
    handleFetchCandidate(trimmedEmail)
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
              setLocalError('')
              if (error) {
                setError(null)
              }
            }}
            disabled={loading}
            required
          />
          <button
            type="submit"
            disabled={!email.trim() || loading}
            className="submit-button"
          >
            { loading ?
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

        {localError && <AlertMessage message={localError} type="error" />}

        {error && <AlertMessage message={error} type="error" />}

        {candidate && (
          <AlertMessage 
            message={`Candidate loaded for ${lastSubmittedEmail}`} 
            type="success" 
          />
        )}

        {candidate && (
          <CandidateCard 
            candidate={candidate}
            onClear={() => {
              clearCandidateData()
              setLastSubmittedEmail('')
            }}
          />
        )}
      </form>
    </>
  )
}

export default GetCandidateData