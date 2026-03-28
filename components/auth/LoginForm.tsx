'use client';

import { Button, Input } from '@/components/ui';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/lib/stores/authStore';
import { loginSchema, type LoginFormValues } from '@/lib/validation/schemas';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginFormValues) =>
      apiClient.post<any>('/users/login', payload).then(res => {
        return res.data;
      }),
    onSuccess: (apiData: any) => {
      const authData = apiData.data || apiData;
      setUser(authData.user);
      setToken(authData.token);
      
      // Verify localStorage
      setTimeout(() => {
        const stored = localStorage.getItem('auth-storage');
      }, 100);
      
      toast.success('Login berhasil!');
      
      // Delay redirect to ensure state is saved
      setTimeout(() => {
        router.push('/dashboard');
      }, 200);
    },
    onError: (error: any) => {
      console.error('[LOGIN] Error:', error);
      const message = error.response?.data?.message || 'Login gagal';
      toast.error(message);
    },
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
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
        isLoading={loginMutation.isPending}
      >
        Login
      </Button>

      <p className="text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Daftar di sini
        </Link>
      </p>
    </form>
  );
};

export default LoginForm
