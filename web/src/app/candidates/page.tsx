/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCandidates } from '@/hooks/useCandidates';
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
import { CandidateCard } from '@/components/CandidateCard';
import { CandidateFilters } from '@/components/CandidateFilters';



import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Briefcase, GraduationCap, X, Check, Share2 } from 'lucide-react'



// interface CandidateCardProps {
//   candidate: {
//     id: string
//     name: string
//     title: string
//     location: string
//     experience: number
//     education: string
//     skills: string[]
//     bio: string
//     matchScore: number
//     avatar?: string
//   }
//   onReject: () => void
//   onApprove: () => void
// }


// interface Candidate {
//   id: string;
//   name: string;
//   email: string;
//   skills: string[];
//   experience: number;
// }

// interface CandidatesListProps {
//   candidates?: Candidate[];
//   isLoading: boolean;
//   error: Error | null;
// }

function CandidatesList({ candidates, isLoading, error }: any) {
  if (error) return <ErrorState title='Error Loading Candidates' description='There was an error loading the candidates list.' />
  if (isLoading) return <div className='container p-4 space-y-4'><LoadingState type="candidate" /></div>
  if (!candidates || candidates.length === 0) return <EmptyState title='No Candidates Found' description='There are no candidates registered yet.' />

  return (
    <div className='container p-4 space-y-4'>
      {candidates.map((candidate: any) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          onReject={() => console.log('Rejected:', candidate.id)}
          onApprove={() => console.log('Approved:', candidate.id)}
        />
      ))}
    </div>
  );
}

export default function CandidatesPage() {
  const { data: candidates, isLoading, error } = useCandidates()

  if (error) return <ErrorState title='Error Loading Candidates' description='There was an error loading the candidates list.' />
  if (isLoading) return <LoadingState type="candidate" />

  return (
    <div className="flex gap-6 h-[calc(100vh-2rem)]">
      <div className="w-[400px] min-w-[400px] h-full overflow-y-auto">
        <CandidateFilters />
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {candidates?.map((candidate: any) => (
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
  )
}

