import type { Job } from '../interfaces/entities/Job'

/**
 * Fetches the list of available job positions from the API
 * 
 * @returns {Promise<Job[]>} Array of available job positions
 * @throws {Error} If the request fails or returns a non-ok status
 * 
 * @example
 * const jobs = await fetchJobsList()
 * // jobs = [{ id: "4416372005", title: "Fullstack developer" }, ...]
 */
export async function fetchJobsList(): Promise<Job[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
  const response = await fetch(`${baseUrl}/api/jobs/get-list`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data
}