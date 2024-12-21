import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, DollarSign, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

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

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                <Link href={`/jobs/${job?.id}`}>{job?.title}</Link>
              </h3>
              <Badge variant={job?.status === 'OPEN' ? 'default' : 'secondary'}>
                {job?.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {job?.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job?.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
               {job?.salary?.min.toLocaleString()} - {job?.salary?.max.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job?.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

