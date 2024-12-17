'use client';

import { useApplications } from '@/hooks/useApplications';

export default function ApplicationsPage() {
  const { data: applications, isLoading, error } = useApplications();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading applications</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      <div className="grid gap-4">
        {applications?.map((application) => (
          <div key={application.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Application ID: {application.id}</p>
                <p className="text-sm text-gray-500">Job ID: {application.jobId}</p>
                <p className="text-sm text-gray-500">Candidate ID: {application.candidateId}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {application.status}
              </span>
            </div>
            {application.notes && (
              <p className="mt-2 text-gray-600">{application.notes}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Applied: {new Date(application.appliedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 