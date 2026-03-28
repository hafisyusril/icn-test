'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { registerSchema, type RegisterFormValues } from '@/lib/validation/schemas';
import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/lib/stores/authStore';
import { apiClient } from '@/lib/api/client';
import { toast } from 'sonner';
import { AuthResponse } from '@/types';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterFormValues) =>
      apiClient.post<any>('/users', payload).then(res => {
        return res.data;
      }),
    onSuccess: (apiData: any) => {
      // Unwrap the nested data structure
      const authData = apiData.data || apiData;
      
      setUser(authData.user);
      setToken(authData.token);
      
      // Verify localStorage
      setTimeout(() => {
        const stored = localStorage.getItem('auth-storage');
      }, 100);
      
      toast.success('Register berhasil!');
      
      // Delay redirect to ensure state is saved
      setTimeout(() => {
        router.push('/dashboard');
      }, 200);
    },
    onError: (error: any) => {
      console.error('[REGISTER] Error:', error);
      const message = error.response?.data?.message || 'Register gagal';
      toast.error(message);
    },
  });

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerMutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        label="Nama Lengkap"
        type="text"
        placeholder="Nama Anda"
        {...formik.getFieldProps('name')}
        error={formik.touched.name ? formik.errors.name : undefined}
      />

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        {...formik.getFieldProps('email')}
        error={formik.touched.email ? formik.errors.email : undefined}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...formik.getFieldProps('password')}
        error={formik.touched.password ? formik.errors.password : undefined}
      />

      <Button
        type="submit"
        fullWidth
        isLoading={registerMutation.isPending}
      >
        Register
      </Button>

      <p className="text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Login di sini
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm