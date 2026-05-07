'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { rehydrateAuth } from '@/features/auth/authSlice';

export default function AuthRehydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Rehydrate auth state from localStorage on first client render
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return null;
}
