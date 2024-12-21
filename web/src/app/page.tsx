/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { JobCard } from "@/components/JobPosting";
import { useState } from 'react'
import { SearchHeader } from "@/components/SearchHeader";
import { useJobs } from "@/hooks/useJobs";

const JobRecommendations = ({ jobs, isLoading, error }: any) => {
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
    <JobCard
      job={jobs[currentIndex]}
      onSkip={handleSkip}
      onApply={handleApply}
      onPrevious={handlePrevious}
      currentIndex={currentIndex}
      totalJobs={jobs.length}
    />
  )

}

export default function Home() {
  const { isLoading, error, data: jobs } = useJobs();

  return (
    <div className="container space-y-4">
      <SearchHeader />
      <JobRecommendations error={error} isLoading={isLoading} jobs={jobs} />
    </div>
  );
}
