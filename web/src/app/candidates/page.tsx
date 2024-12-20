'use client';

import { useCandidates } from '@/hooks/useCandidates';
import { AlertCircle, FolderOpen } from "lucide-react";
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/components/ui/states';
import { LoadingState } from '@/components/ui/skeletons';
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react'


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Briefcase, GraduationCap, X, Check, Share2 } from 'lucide-react'



interface CandidateCardProps {
  candidate: {
    id: string
    name: string
    title: string
    location: string
    experience: number
    education: string
    skills: string[]
    bio: string
    matchScore: number
    avatar?: string
  }
  onReject: () => void
  onApprove: () => void
}

export function CandidateCard({ candidate, onReject, onApprove }: CandidateCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-12 w-12 shrink-0">
            {candidate.avatar ? (
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
            ) : (
              <AvatarFallback className="bg-primary/10">{candidate.name[0]}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{candidate.name}</h2>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    {candidate.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-muted-foreground">{candidate.title}</p>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{candidate.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={onReject}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={onApprove}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{candidate.experience} years of experience</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{candidate.education}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-full">
                  {skill}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground">{candidate.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



interface CandidateSearchHeaderProps {
  onSearch: (filters: any) => void
}

export function CandidateSearchHeader({ onSearch }: CandidateSearchHeaderProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Candidate matches</h1>
        <p className="text-xl text-muted-foreground">
          Discover talented candidates that match your company's requirements and open positions.
        </p>
      </div>

      <div className="rounded-lg bg-card shadow-sm border p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Skills or role"
              className="pl-9"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Location or timezone"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="2-weeks">2 weeks notice</SelectItem>
              <SelectItem value="month">1 month notice</SelectItem>
              <SelectItem value="passive">Passive</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50">$0 - $50,000</SelectItem>
              <SelectItem value="50-100">$50,000 - $100,000</SelectItem>
              <SelectItem value="100-150">$100,000 - $150,000</SelectItem>
              <SelectItem value="150+">$150,000+</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button variant="ghost">Clear</Button>
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </div>
  )
}



interface Candidate {
    id: string;
    name: string;
    email: string;
    skills: string[];
    experience: number;
}

interface CandidatesListProps {
    candidates: Candidate[] | null;
    isLoading: boolean;
    error: Error | null;
}

function CandidatesList({ candidates, isLoading, error }: CandidatesListProps) {
    if (error) return <ErrorState title='Error Loading Candidates' description='There was an error loading the candidates list.' />
    if (isLoading) return <LoadingState type="candidate" />
    if (!candidates || candidates.length === 0) return <EmptyState title='No Candidates Found' description='There are no candidates registered yet.' />

    return (
        <div>
            {candidates.map((candidate) => (
                <div key={candidate.id} className="p-4 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold">{candidate.name}</h2>
                    <p className="text-gray-600 mt-2">{candidate.email}</p>
                    <div className="mt-2">
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {candidate.experience} years of experience
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

const mockCandidates = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      experience: 6,
      education: 'BS Computer Science, Stanford University',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      bio: 'Passionate frontend developer with expertise in building scalable web applications. Strong focus on user experience and performance optimization.',
      matchScore: 95,
    },
    {
      id: '2',
      name: 'Michael Park',
      title: 'Full Stack Engineer',
      location: 'New York, NY',
      experience: 4,
      education: 'MS Computer Engineering, MIT',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
      bio: 'Full stack developer with a strong background in building scalable backend systems and intuitive frontend interfaces.',
      matchScore: 88,
    },
    {
      id: '3',
      name: 'Emma Wilson',
      title: 'DevOps Engineer',
      location: 'London, UK',
      experience: 5,
      education: 'BSc Computer Science, Imperial College London',
      skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Docker'],
      bio: 'DevOps engineer specializing in cloud infrastructure and automation. Experience with large-scale deployment and monitoring.',
      matchScore: 92,
    }
  ]
  

export default function CandidatesPage() {
    const { data: candidates, isLoading, error } = useCandidates();

    return (
        <div>
      <CandidateSearchHeader onSearch={(filters) => console.log('Search:', filters)} />
      <div className="container">
        <div className="space-y-4">
          {mockCandidates.map((candidate) => (
            <CandidateCard 
              key={candidate.id}
              candidate={candidate}
              onReject={() => console.log('Rejected:', candidate.id)}
              onApprove={() => console.log('Approved:', candidate.id)}
            />
          ))}
        </div>
      </div>
        </div>
    );
} 