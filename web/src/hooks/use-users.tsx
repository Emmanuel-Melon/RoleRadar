import { 
    useQuery, 
    useMutation, 
    useQueryClient,
  } from '@tanstack/react-query';
  import axios from 'axios';
  import { apiUrl } from '@/app/config';
  
  // Types
  export interface User {
    id: string;
    email: string;
    name: string;
    role: 'CANDIDATE' | 'RECRUITER';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Project {
    id: string;
    userId: string;
    title: string;
    description: string;
    url?: string;
    image?: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Experience {
    id: string;
    userId: string;
    title: string;
    company: string;
    companyLogo?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
    technologies: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Education {
    id: string;
    userId: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface QueryParams {
    skip?: number;
    take?: number;
    where?: Record<string, unknown>;
    orderBy?: Record<string, unknown>;
  }
  
  // User Hooks
  export const useUsers = (params: QueryParams = {}) => {
    return useQuery({
      queryKey: ['users', params],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/users`, { params });
        return data as User[];
      }
    });
  };
  
  export const useUser = (id: string) => {
    return useQuery({
      queryKey: ['user', id],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/users/${id}`);
        return data as User;
      },
      enabled: !!id
    });
  };
  
  export const useCreateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (newUser: Partial<User>) => 
        axios.post(`${apiUrl}/users`, newUser),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    });
  };
  
  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, ...data }: Partial<User> & { id: string }) => 
        axios.put(`${apiUrl}/users/${id}`, data),
      onSuccess: (_: unknown, variables: { id: string }) => {
        queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    });
  };
  
  export const useDeleteUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: string) => 
        axios.delete(`${apiUrl}/users/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    });
  };
  
  // Project Hooks
  export const useUserProjects = (userId: string, params: QueryParams = {}) => {
    return useQuery({
      queryKey: ['userProjects', userId, params],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/users/${userId}/projects`, { params });
        return data as Project[];
      },
      enabled: !!userId
    });
  };
  
  export const useProject = (id: string) => {
    return useQuery({
      queryKey: ['project', id],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/projects/${id}`);
        return data as Project;
      },
      enabled: !!id
    });
  };
  
  export const useCreateProject = (userId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (newProject: Partial<Project>) => 
        axios.post(`${apiUrl}/users/${userId}/projects`, newProject),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userProjects', userId] });
      }
    });
  };
  
  export const useUpdateProject = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, ...data }: Partial<Project> & { id: string }) => 
        axios.put(`${apiUrl}/projects/${id}`, data),
      onSuccess: (_: unknown, variables: { id: string }) => {
        queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['userProjects'] });
      }
    });
  };
  
  export const useDeleteProject = (userId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: string) => 
        axios.delete(`${apiUrl}/projects/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userProjects', userId] });
      }
    });
  };
  
  // Experience Hooks
  export const useUserExperiences = (userId: string, params: QueryParams = {}) => {
    return useQuery({
      queryKey: ['userExperiences', userId, params],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/users/${userId}/experience`, { params });
        return data as Experience[];
      },
      enabled: !!userId
    });
  };
  
  export const useExperience = (id: string) => {
    return useQuery({
      queryKey: ['experience', id],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/experience/${id}`);
        return data as Experience;
      },
      enabled: !!id
    });
  };
  
  export const useCreateExperience = (userId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (newExperience: Partial<Experience>) => 
        axios.post(`${apiUrl}/users/${userId}/experience`, newExperience),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userExperiences', userId] });
      }
    });
  };
  
  export const useUpdateExperience = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, ...data }: Partial<Experience> & { id: string }) => 
        axios.put(`${apiUrl}/experiences/${id}`, data),
      onSuccess: (_: unknown, variables: { id: string }) => {
        queryClient.invalidateQueries({ queryKey: ['experience', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['userExperiences'] });
      }
    });
  };
  
  export const useDeleteExperience = (userId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: string) => 
        axios.delete(`${apiUrl}/experiences/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userExperiences', userId] });
      }
    });
  };
  
  // Education Hooks
  export const useUserEducation = (userId: string, params: QueryParams = {}) => {
    return useQuery({
      queryKey: ['userEducation', userId, params],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/users/${userId}/education`, { params });
        return data as Education[];
      },
      enabled: !!userId
    });
  };
  
  export const useEducationItem = (id: string) => {
    return useQuery({
      queryKey: ['education', id],
      queryFn: async () => {
        const { data } = await axios.get(`${apiUrl}/education/${id}`);
        return data as Education;
      },
      enabled: !!id
    });
  };
  
  export const useCreateEducation = (userId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (newEducation: Partial<Education>) => 
        axios.post(`${apiUrl}/users/${userId}/education`, newEducation),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userEducation', userId] });
      }
    });
  };
  
  export const useUpdateEducation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, ...data }: Partial<Education> & { id: string }) => 
        axios.put(`${apiUrl}/education/${id}`, data),
      onSuccess: (_: unknown, variables: { id: string }) => {
        queryClient.invalidateQueries({ queryKey: ['education', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['userEducation'] });
      }
    });
  };
  
  export const useDeleteEducation = (userId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: string) => 
        axios.delete(`${apiUrl}/education/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userEducation', userId] });
      }
    });
  };