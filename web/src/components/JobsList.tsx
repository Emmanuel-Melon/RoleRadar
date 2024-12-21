import { JobCard } from '@/components/JobCard'
import { EmptyState } from '@/components/ui/states'
import { LoadingState } from '@/components/ui/skeletons'

interface Job {
  id: string
  title: string
  description: string
  location: string
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP'
  salary: {
    min: number
    max: number
    currency: string
  }
  requirements: string[]
  skills: string[]
  status: 'OPEN' | 'CLOSED'
  createdAt: string
  updatedAt: string
}

interface JobsListProps {
  jobs?: Job[]
  isLoading: boolean
  error: Error | null
}

export function JobsList({ jobs, isLoading, error }: JobsListProps) {
  if (error) {
    return (
      <EmptyState
        title="Error Loading Jobs"
        description="There was an error loading the jobs list."
      />
    )
  }

  if (isLoading) {
    return <LoadingState type="job" />
  }

  if (!jobs?.length) {
    return (
      <EmptyState
        title="No Jobs Found"
        description="Get started by creating your first job posting."
      />
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

