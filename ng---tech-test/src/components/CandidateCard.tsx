import type { Candidate } from '../lib/interfaces/entities/Candidate'
import '../styles/GetCandidateData.css'

interface CandidateCardProps {
  candidate: Candidate
  onClear: () => void
}

function CandidateCard({ candidate, onClear }: CandidateCardProps) {
  return (
    <div className="candidate-card">
      <div className="candidate-card__header">
        <div>
          <h2>{candidate.firstName} {candidate.lastName}</h2>
          <p>{candidate.email}</p>
        </div>
        <button type="button" className="clear-button" onClick={onClear}>
          Clear
        </button>
      </div>
      <div className="candidate-card__meta">
        <div>
          <span>Candidate ID</span>
          <strong>{candidate.candidateId}</strong>
        </div>
        <div>
          <span>Application ID</span>
          <strong>{candidate.applicationId}</strong>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard