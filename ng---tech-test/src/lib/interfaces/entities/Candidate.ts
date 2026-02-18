/**
 * Represents a candidate from the API response
 */
export interface Candidate {
  uuid: string
  candidateId: string
  applicationId: string
  firstName: string
  lastName: string
  email: string
}