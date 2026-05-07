'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(s => s.auth);
  const [hydrated, setHydrated] = useState(false);

  // Wait for client-side hydration before checking auth
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [hydrated, isAuthenticated, router]);

  // Show spinner only after hydration confirms we're not authenticated
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-noir-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
          <p className="font-accent text-xs tracking-widest uppercase text-noir-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
