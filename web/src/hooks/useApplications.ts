import { 
  useQuery, 
  useMutation, 
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '@/app/config';

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
      const { data } = await axios.get(`${apiUrl}/applications`, { params });
      return data as Application[];
    }
  });
};

// Fetch single application
export const useApplication = (id: string) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}/applications/${id}`);
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
      axios.post(`${apiUrl}/applications`, newApplication),
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
      axios.put(`${apiUrl}/applications/${id}`, data),
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
      axios.delete(`${apiUrl}/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
}; 