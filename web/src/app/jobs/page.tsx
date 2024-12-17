'use client';

import { useJobs } from '@/hooks/useJobs';

export default function JobsPage() {
  const { data: jobs, isLoading, error } = useJobs();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <div className="grid gap-4">
        {jobs?.map((job) => (
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
    </div>
  );
} 