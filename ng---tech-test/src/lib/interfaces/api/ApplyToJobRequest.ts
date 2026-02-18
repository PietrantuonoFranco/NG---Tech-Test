export interface ApplyToJobRequest {
    uuid: string
    jobId: string
    candidateId: string
    applicationId?: string
    repoUrl: string
}