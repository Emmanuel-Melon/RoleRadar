"use client";
import { JobCard } from "@/components/JobPosting";
import { useState } from 'react'
import { SearchHeader } from "@/components/SearchHeader";

const jobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '120k - 160k/year',
    description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be working on cutting-edge web applications using React and Next.js.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'InnovateTech',
    location: 'New York, NY',
    salary: '130k - 180k/year',
    description: 'Join our team as a Full Stack Engineer and work on exciting projects using a variety of technologies including Node.js, React, and AWS.',
    skills: ['Node.js', 'React', 'AWS', 'MongoDB'],
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignMasters',
    location: 'Remote',
    salary: '90k - 120k/year',
    description: 'We are seeking a talented UX/UI Designer to create beautiful and intuitive user interfaces for our web and mobile applications.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research'],
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudSolutions',
    location: 'Seattle, WA',
    salary: '110k - 150k/year',
    description: 'Join our DevOps team to build and maintain robust CI/CD pipelines and cloud infrastructure using cutting-edge technologies.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataInsights',
    location: 'Boston, MA',
    salary: '130k - 170k/year',
    description: 'We are looking for a Data Scientist to help us extract valuable insights from complex datasets and develop machine learning models.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
  },
]


export default function Home() {
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

  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`)
  }

  return (
    <div className="container space-y-4">
      <SearchHeader onSearch={handleSearch} />
      <JobCard 
        job={jobs[currentIndex]}
        onSkip={handleSkip}
        onApply={handleApply}
        onPrevious={handlePrevious}
        currentIndex={currentIndex}
        totalJobs={jobs.length}
      />
    </div>
  );
}
