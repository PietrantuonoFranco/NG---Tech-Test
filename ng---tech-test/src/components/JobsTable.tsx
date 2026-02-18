import { useState } from 'react'
import type { Job } from '../lib/interfaces/entities/Job'
import { applyToJob } from '../lib/api/applyToJob'
import { useCandidateContext } from '../contexts/CandidateContext'
import '../styles/JobsTable.css'

interface JobsTableProps {
  jobs: Job[]
  loading?: boolean
}

function JobsTable({ jobs, loading }: JobsTableProps) {
  const { candidate } = useCandidateContext()
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null)
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const handleApply = async (jobId: string) => {
    if (!candidate) return
    
    setApplyingJobId(jobId)
    setError(null)

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: jobId,
        candidateId: candidate.candidateId,
        repoUrl: import.meta.env.VITE_GITHUB_REPO_URL || '',
      })
      
      setAppliedJobs(prev => new Set(prev).add(jobId))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply to job'
      setError(errorMessage)
      console.error('Error applying to job:', err)
    } finally {
      setApplyingJobId(null)
    }
  }

  if (loading) {
    return (
      <div className="jobs-table-loading">
        Loading available positions...
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="jobs-table-empty">
        No positions available at the moment.
      </div>
    )
  }

  return (
    <div className="jobs-table-container">
      <div className="jobs-table-header">
        <h3 className="jobs-table-title">
          Available Positions
        </h3>
      </div>
      {error && (
        <div className="jobs-table-error">
          {error}
        </div>
      )}
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Position Title</th>
            <th className="center">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const isApplying = applyingJobId === job.id
            const hasApplied = appliedJobs.has(job.id)
            
            return (
              <tr key={job.id}>
                <td className="jobs-table-cell-id">{job.id}</td>
                <td className="jobs-table-cell-title">{job.title}</td>
                <td className="jobs-table-cell-action">
                  <button
                    type="button"
                    className={`jobs-table-apply-btn ${hasApplied ? 'jobs-table-apply-btn--applied' : ''}`}
                    onClick={() => handleApply(job.id)}
                    disabled={isApplying || hasApplied}
                  >
                    {isApplying ? 'Applying...' : hasApplied ? 'Applied ✓' : 'Apply'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default JobsTable