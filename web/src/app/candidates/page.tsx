'use client';

import { useCandidates } from '@/hooks/useCandidates';
import { AlertCircle, FolderOpen } from "lucide-react";
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/components/ui/states';
import { LoadingState } from '@/components/ui/skeletons';

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

export default function CandidatesPage() {
    const { data: candidates, isLoading, error } = useCandidates();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Candidates</h1>
            <div className="grid gap-4">
                <CandidatesList error={error} isLoading={isLoading} candidates={candidates} />
            </div>
        </div>
    );
} 