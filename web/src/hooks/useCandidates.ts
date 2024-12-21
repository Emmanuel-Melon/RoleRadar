import { 
  useQuery, 
  useMutation, 
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '@/app/config';

// Types
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resume?: string;
  skills?: string[];
  createdAt: string;
  updatedAt: string;
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
      const { data } = await axios.get(`${apiUrl}/candidates`, { params });
      return data as Candidate[];
    }
  });
};

// Fetch single candidate
export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}/candidates/${id}`);
      return data as Candidate;
    },
    enabled: !!id
  });
};

// Create candidate mutation
export const useCreateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCandidate: Partial<Candidate>) => 
      axios.post(`${apiUrl}/candidates`, newCandidate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    }
  });
};

// Update candidate mutation
export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Candidate> & { id: string }) => 
      axios.put(`${apiUrl}/candidates/${id}`, data),
    onSuccess: (_: unknown, variables: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: ['candidate', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    }
  });
};

// Delete candidate mutation
export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => 
      axios.delete(`${apiUrl}/candidates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    }
  });
}; 