import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertRegistration, type RegistrationResponse } from "@shared/routes";
import { z } from "zod";

// Admin Auth Hook
export function useAuth() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [api.auth.check.path],
    queryFn: async () => {
      const res = await fetch(api.auth.check.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to check auth");
      return api.auth.check.responses[200].parse(await res.json());
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const res = await fetch(api.auth.login.path, {
        method: api.auth.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid password");
        throw new Error("Login failed");
      }
      return api.auth.login.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.auth.check.path] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(api.auth.logout.path, {
        method: api.auth.logout.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.auth.check.path] });
      queryClient.setQueryData([api.auth.check.path], { authenticated: false });
    },
  });

  return {
    isAuthenticated: !!data?.authenticated,
    isLoading,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
  };
}

// Registration Hooks
export function useRegistrations() {
  return useQuery({
    queryKey: [api.registrations.list.path],
    queryFn: async () => {
      const res = await fetch(api.registrations.list.path, { credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to fetch registrations");
      }
      return api.registrations.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const res = await fetch(api.registrations.create.path, {
        method: api.registrations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to submit registration");
      }
      
      return api.registrations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.registrations.list.path] });
    },
  });
}

export function useDeleteRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.registrations.delete.path, { id });
      const res = await fetch(url, { 
        method: api.registrations.delete.method,
        credentials: "include"
      });
      
      if (!res.ok) throw new Error("Failed to delete registration");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.registrations.list.path] });
    },
  });
}
