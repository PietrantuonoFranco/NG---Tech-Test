import { useState } from "react"
import GetCandidateData from "./components/GetCandidateData"
import JobsTable from "./components/JobsTable"
import AlertMessage from "./components/AlertMessage"
import { fetchJobsList } from "./lib/api/fetchJobsList"

function App() {
  const [jobs, setJobs] = useState([])
  const [jobsLoading, setJobsLoading] = useState(false)
  const [jobsError, setJobsError] = useState(null)

  const handleFetchJobs = async () => {
    setJobsLoading(true)
    setJobsError(null)

    try {
      const jobsList = await fetchJobsList()
      setJobs(jobsList)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs list'
      setJobsError(errorMessage)
    } finally {
      setJobsLoading(false)
    }
  }

  const handleClearJobs = () => {
    setJobs([])
    setJobsError(null)
  }

  return (
    <main>
      <GetCandidateData 
        onCandidateLoaded={handleFetchJobs}
        onCandidateCleared={handleClearJobs}
      />

      {jobsError && <AlertMessage message={jobsError} type="error" />}
      
      {jobs.length > 0 && <JobsTable jobs={jobs} loading={jobsLoading} />}
    </main>
  )
}

export default App