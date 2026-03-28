
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const { user, token, logout, _hasHydrated } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for Zustand to hydrate from localStorage
    const checkHydration = () => {
      if (_hasHydrated) {
        setIsHydrated(true);
      } else {
        setTimeout(checkHydration, 50);
      }
    };
    checkHydration();
  }, [_hasHydrated]);

  const isAuthenticated = isHydrated && !!token && !!user;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    isHydrated,
    logout: handleLogout,
  };
};
