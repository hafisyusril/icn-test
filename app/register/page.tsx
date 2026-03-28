/**
 * Register Page
 */

'use client';

import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-sm text-gray-600 mt-2">
            Buat akun baru untuk memulai
          </p>
        </CardHeader>
        <CardBody>
          <RegisterForm />
        </CardBody>
      </Card>
    </div>
  );
}
