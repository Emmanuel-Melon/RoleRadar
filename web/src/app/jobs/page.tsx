'use client'

import { useJobs } from '@/hooks/useJobs'
import { JobsList } from '@/components/JobsList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function JobsPage() {
  const { data: jobs, isLoading, error } = useJobs()

  return (
    <div className="container py-6 space-y-6 p-4 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Manage your job postings and view applications
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Link>
        </Button>
      </div>
      <JobsList jobs={jobs} isLoading={isLoading} error={error} />
    </div>
  )
}

