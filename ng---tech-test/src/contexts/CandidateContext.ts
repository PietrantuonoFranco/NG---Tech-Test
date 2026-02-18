import { createContext, useContext } from 'react'

import { CandidateContextType } from '../lib/interfaces/contexts/CandidateContextType'

/**
 * React Context for managing candidate data globally
 */
export const CandidateContext = createContext<CandidateContextType | undefined>(undefined)

/**
 * Custom hook to use the CandidateContext
 * 
 * @returns {CandidateContextType} The candidate context value
 * @throws {Error} If used outside of CandidateProvider
 * 
 * @example
 * const { candidate, loading, error } = useCandidateContext()
 */
export const useCandidateContext = (): CandidateContextType => {
  const context = useContext(CandidateContext)
  
  if (context === undefined) {
    throw new Error('useCandidateContext must be used within a CandidateProvider')
  }
  
  return context
}