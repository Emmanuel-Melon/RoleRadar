'use client';

import { useCandidates } from '@/hooks/useCandidates';

export default function CandidatesPage() {
  const { data: candidates, isLoading, error } = useCandidates();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading candidates</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>
      <div className="grid gap-4">
        {candidates?.map((candidate) => (
          <div key={candidate.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-600">{candidate.email}</p>
            <p className="text-gray-600">{candidate.phone}</p>
            <div className="mt-2">
              <div className="flex gap-2 flex-wrap">
                {candidate.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 