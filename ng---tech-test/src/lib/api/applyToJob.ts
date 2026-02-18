import { ApplyToJobRequest } from '../interfaces/api/ApplyToJobRequest'
import { ApplyToJobResponse } from '../interfaces/api/ApplyToJobResponse'

/**
 * Applies to a job position
 * 
 * @param {ApplyToJobRequest} data - The application data
 * @returns {Promise<ApplyToJobResponse>} The response indicating success
 * @throws {Error} If the request fails or returns a non-ok status
 * 
 * @example
 * const result = await applyToJob({
 *   uuid: "candidate-uuid",
 *   jobId: "4416372005",
 *   candidateId: "12345",
 *   repoUrl: "https://github.com/username/repo"
 * })
 */
export async function applyToJob(data: ApplyToJobRequest): Promise<ApplyToJobResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
  const response = await fetch(`${baseUrl}/api/candidate/apply-to-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  return result
}
