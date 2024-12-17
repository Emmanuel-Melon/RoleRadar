'use client';

import { useApplications } from '@/hooks/useApplications';
import { AlertCircle, FolderOpen } from "lucide-react";
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/components/ui/states';
import { LoadingState } from '@/components/ui/skeletons';

interface Application {
    id: string;
    jobId: string;
    candidateId: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    appliedAt: string;
}

interface ApplicationsListProps {
    applications: Application[] | null;
    isLoading: boolean;
    error: Error | null;
}

function ApplicationsList({ applications, isLoading, error }: ApplicationsListProps) {
    if (error) return <ErrorState title='Error Loading Applications' description='There was an error loading the applications list.' />
    if (isLoading) return <LoadingState type="application" />
    if (!applications || applications.length === 0) return <EmptyState title='No Applications Found' description='There are no applications submitted yet.' />

    return (
        <div>
            {applications.map((application) => (
                <div key={application.id} className="p-4 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold">Application #{application.id}</h2>
                    <div className="mt-2 flex items-center gap-4">
                        <span className="text-sm text-gray-500">Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
                        <span className={`text-sm ${
                            application.status === 'ACCEPTED' ? 'text-green-500' : 
                            application.status === 'REJECTED' ? 'text-red-500' : 
                            'text-yellow-500'
                        }`}>
                            {application.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function ApplicationsPage() {
    const { data: applications, isLoading, error } = useApplications();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Applications</h1>
            <div className="grid gap-4">
                <ApplicationsList error={error} isLoading={isLoading} applications={applications} />
            </div>
        </div>
    );
} 