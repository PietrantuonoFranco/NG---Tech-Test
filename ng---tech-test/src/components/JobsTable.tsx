import type { Job } from '../lib/interfaces/entities/Job'
import '../styles/JobsTable.css'

interface JobsTableProps {
  jobs: Job[]
  loading?: boolean
}

function JobsTable({ jobs, loading }: JobsTableProps) {
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
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Position Title</th>
            <th className="center">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="jobs-table-cell-id">{job.id}</td>
              <td className="jobs-table-cell-title">{job.title}</td>
              <td className="jobs-table-cell-action">
                <button
                  type="button"
                  className="jobs-table-apply-btn"
                  onClick={() => console.log('Apply to job:', job.id)}
                >
                  Apply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobsTable