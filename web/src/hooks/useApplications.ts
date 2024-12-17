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

// Create application mutation
export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newApplication: Partial<Application>) => 
      axios.post(`${API_URL}/applications`, newApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
};

// Update application mutation
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Application> & { id: string }) => 
      axios.put(`${API_URL}/applications/${id}`, data),
    onSuccess: (_: unknown, variables: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: ['application', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
};

// Delete application mutation
export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => 
      axios.delete(`${API_URL}/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
}; 