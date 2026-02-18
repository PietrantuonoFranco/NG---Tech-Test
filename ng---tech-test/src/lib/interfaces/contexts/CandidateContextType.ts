import { Candidate } from '../entities/Candidate'

/**
 * Context value type for candidate management
 */
export interface CandidateContextType {
  candidate: Candidate | null
  loading: boolean
  error: string | null
  setCandidateData: (candidate: Candidate) => void
  clearCandidateData: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}