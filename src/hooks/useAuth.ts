import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { LoginInput, SignupInput, ForgotPasswordInput, ResetPasswordInput } from '../schemas/auth.schema';

export const useSignup = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: SignupInput) => {
      const response = await api.post('/auth/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate('/');
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate('/');
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordInput) => {
      const response = await api.post('/auth/forgot-password', data);
      return response.data;
    },
  });
};

export const useResetPassword = (resetToken: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ResetPasswordInput) => {
      const response = await api.put(`/auth/reset-password/${resetToken}`, {
        password: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      navigate('/login');
    },
  });
};
