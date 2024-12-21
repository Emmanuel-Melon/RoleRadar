"use client"

import { JobCard,Instructions } from "@/components/JobPosting"
// import { Instructions } from "@/components/Instructions"
import { useState } from 'react'
import { SearchHeader } from "@/components/SearchHeader"
import { useJobs } from "@/hooks/useJobs"
import { useAuth } from "@/hooks/use-auth"

const JobRecommendations = ({ jobs, isLoading, error }: any) => {
  const { user } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const handleSkip = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length)
  }

  const handleApply = () => {
    console.log(`Applied to job: ${jobs[currentIndex].title}`)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + jobs.length) % jobs.length)
  }

  if (isLoading) return <p>Loading Jobs</p>
  if (error) return <p>Failed to get jobs</p>
  
  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-12 flex-1">
      <JobCard
        job={jobs[currentIndex]}
        onSkip={handleSkip}
        onApply={handleApply}
        onPrevious={handlePrevious}
        currentIndex={currentIndex}
        totalJobs={jobs.length}
      />
      <Instructions />
    </div>
  )
}

export default function Home() {
  const { isLoading, error, data: jobs } = useJobs()

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-2rem)]">
      <div className="hidden md:block w-[400px] min-w-[400px] h-full overflow-y-auto">
        <SearchHeader />
      </div>
      <div className="flex-1">
        <JobRecommendations error={error} isLoading={isLoading} jobs={jobs} />
      </div>
    </div>
  )
}
