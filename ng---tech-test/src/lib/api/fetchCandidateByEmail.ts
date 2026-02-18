import type { Candidate } from '../interfaces/entities/Candidate'

/**
 * Fetches candidate data from the API by email address
 * 
 * @param {string} email - The candidate's email address
 * @returns {Promise<Candidate>} The candidate data
 * @throws {Error} If the request fails or returns a non-ok status
 * 
 * @example
 * const candidate = await fetchCandidateByEmail('john@example.com')
 */

export async function fetchCandidateByEmail(email: string): Promise<Candidate> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
  const response = await fetch(`${baseUrl}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data
}
