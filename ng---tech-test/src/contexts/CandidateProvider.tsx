import { useState, ReactNode } from 'react'
import { CandidateContext } from './CandidateContext'

// Interfaces
import { CandidateContextType } from '../lib/interfaces/contexts/CandidateContextType'
import { Candidate } from '../lib/interfaces/entities/Candidate'

/**
 * Props for CandidateProvider component
 */
interface CandidateProviderProps {
  children: ReactNode
}

/**
 * Provider component that wraps the application to provide candidate context
 * 
 * Manages the state of:
 * - candidate: The current candidate data from API response
 * - loading: Loading state during API requests
 * - error: Error messages from failed requests
 * 
 * @param {CandidateProviderProps} props - The provider props
 * @returns {JSX.Element} The provider component with context
 * 
 * @example
 * <CandidateProvider>
 *   <App />
 * </CandidateProvider>
 */
export const CandidateProvider = ({ children }: CandidateProviderProps) => {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoadingState] = useState(false)
  const [error, setErrorState] = useState<string | null>(null)

  /**
   * Sets the candidate data from API response
   */
  const setCandidateData = (candidateData: Candidate) => {
    setCandidate(candidateData)
    setErrorState(null)
  }

  /**
   * Clears the candidate data and resets state
   */
  const clearCandidateData = () => {
    setCandidate(null)
    setErrorState(null)
  }

  /**
   * Sets the loading state
   */
  const setLoading = (isLoading: boolean) => {
    setLoadingState(isLoading)
  }

  /**
   * Sets the error message
   */
  const setError = (errorMessage: string | null) => {
    setErrorState(errorMessage)
  }

  const value: CandidateContextType = {
    candidate,
    loading,
    error,
    setCandidateData,
    clearCandidateData,
    setLoading,
    setError,
  }

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  )
}