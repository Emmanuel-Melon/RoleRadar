import { 
  useQuery, 
  useMutation, 
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
// import { toast } from "@/hooks/use-toast";
import { apiUrl } from '@/app/config';

// Types
export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: string;
  requirements?: string;
  createdAt: string;
  updatedAt: string;
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
      const { data } = await axios.get(`${apiUrl}/jobs`, { params });
      return data as Job[];
    },
    // onError: (error) => {
    //   console.error('Failed to fetch jobs:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to fetch jobs. Please try again later.",
    //     variant: "destructive",
    //   });
    // }
  });
};

// Fetch single job
export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}/jobs/${id}`);
      return data as Job;
    },
    enabled: !!id
  });
};

// Create job mutation
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newJob: Partial<Job>) => 
      axios.post(`${apiUrl}/jobs`, newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
  });
};

// Update job mutation
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Job> & { id: string }) => 
      axios.put(`${apiUrl}/jobs/${id}`, data),
    onSuccess: (_: unknown, variables: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: ['job', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
  });
};

// Delete job mutation
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => 
      axios.delete(`${apiUrl}/jobs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
  });
}; 