import { 
  useQuery, 
  useMutation, 
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
  notes?: string;
}

export interface ApplicationQueryParams {
  skip?: number;
  take?: number;
  where?: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
}

// Fetch all applications
export const useApplications = (params: ApplicationQueryParams = {}) => {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/applications`, { params });
      return data as Application[];
    }
  });
};

// Fetch single application
export const useApplication = (id: string) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/applications/${id}`);
      return data as Application;
    },
    enabled: !!id
  });
}; 