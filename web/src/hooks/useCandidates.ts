import { 
  useQuery, 
  useMutation, 
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CandidateQueryParams {
  skip?: number;
  take?: number;
  where?: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
}

// Fetch all candidates
export const useCandidates = (params: CandidateQueryParams = {}) => {
  return useQuery({
    queryKey: ['candidates', params],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/candidates`, { params });
      return data as Candidate[];
    }
  });
};

// Fetch single candidate
export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/candidates/${id}`);
      return data as Candidate;
    },
    enabled: !!id
  });
}; 