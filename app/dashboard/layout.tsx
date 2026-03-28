/**
 * Dashboard Layout - Protected route
 */

'use client';

import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, isHydrated, logout } = useAuth();

  console.log("[USER NAME]", user?.name)
  console.log("[USER]", user)

  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      console.log('[Dashboard] Not authenticated, redirecting to login');
      router.push('/login');
    }
  }, [isHydrated, isAuthenticated, router]);

   // Handle Logout
  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-sm text-gray-600 mt-1">
                Selamat datang, <span className="font-semibold">{user?.email || 'User'}</span>
              </p>
            </div>
            <div>
               <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
