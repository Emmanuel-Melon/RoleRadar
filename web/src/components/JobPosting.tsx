'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Building2, MapPin, DollarSign, X, Check, Share2, ArrowLeft } from 'lucide-react'

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    salary: string
    description: string
    skills: string[]
  }
  onSkip: () => void
  onApply: () => void
  onPrevious: () => void
  currentIndex: number
  totalJobs: number
}

// preferred image: https://img.freepik.com/premium-vector/office-desk-vector-illustration_135595-61415.jpg

export function JobCard({ job, onSkip, onApply, onPrevious, currentIndex, totalJobs }: JobCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const handleSkip = () => {
    setDirection('left')
    setIsAnimating(true)
    setTimeout(() => {
      onSkip?.()
      setIsAnimating(false)
      setDirection(null)
    }, 300)
  }

  const handleApply = () => {
    setDirection('right')
    setIsAnimating(true)
    setTimeout(() => {
      onApply?.()
      setIsAnimating(false)
      setDirection(null)
    }, 300)
  }

  return (
    <Card 
      className={`w-full max-w-md mx-auto transform transition-all duration-300 ${
        isAnimating
          ? direction === 'left'
            ? '-translate-x-full rotate-[-20deg] opacity-0'
            : 'translate-x-full rotate-[20deg] opacity-0'
          : ''
      }`}
    >
      <CardHeader className="relative h-48">
        <img src="https://images.template.net/111920/free-boho-office-background-am3uc.jpg" alt="Job Posting Background" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground">{job.description}</p>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-4 justify-center">
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleSkip}
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={handleApply}
        >
          <Check className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full"
          onClick={onPrevious}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </CardFooter>
    </Card>
  )
}

