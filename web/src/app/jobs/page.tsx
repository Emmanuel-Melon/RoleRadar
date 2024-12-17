'use client';
import { useJobs } from '@/hooks/useJobs';
import { AlertCircle, FolderOpen } from "lucide-react";
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ErrorStateProps {
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FolderOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
            {action && (
                <Button onClick={action.onClick} size="sm">
                    {action.label}
                </Button>
            )}
        </div>
    );
}


function ErrorState({ title, description, action }: ErrorStateProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-destructive p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
            {action && (
                <Button onClick={action.onClick} variant="outline" size="sm">
                    {action.label}
                </Button>
            )}
        </div>
    );
}

interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    status: 'OPEN' | 'CLOSED';
}

interface JobsListProps {
    jobs: Job[] | null;
    isLoading: boolean;
    error: Error | null;
}

function JobsList({ jobs, isLoading, error }: JobsListProps) {
    if (error) return <ErrorState title='Error Loading Jobs' description='There was an error loading the jobs list.' />
    if (isLoading) return <p>Loading</p>
    if (!jobs || jobs.length === 0) return <EmptyState title='No Jobs Found' description='There are no jobs posted yet.' />

    return (
        <div>
            {jobs.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                        <span className="text-sm text-gray-500">{job.location}</span>
                        <span className="text-sm text-gray-500">${job.salary}</span>
                        <span className={`text-sm ${job.status === 'OPEN' ? 'text-green-500' : 'text-red-500'}`}>
                            {job.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function JobsPage() {
    const { data: jobs, isLoading, error } = useJobs();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading jobs</div>;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Jobs</h1>
            <div className="grid gap-4">
                <JobsList error={error} isLoading={isLoading} jobs={jobs} />
            </div>
        </div>
    );
} 