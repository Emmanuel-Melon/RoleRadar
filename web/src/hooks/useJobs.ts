import { 
  useQuery, 
  useMutation, 
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary: number;
  status: 'OPEN' | 'CLOSED';
}

export interface JobQueryParams {
  skip?: number;
  take?: number;
  where?: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
}

// Fetch all jobs
export const useJobs = (params: JobQueryParams = {}) => {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/jobs`, { params });
      return data as Job[];
    }
  });
};

// Fetch single job
export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/jobs/${id}`);
      return data as Job;
    },
    enabled: !!id
  });
}; 