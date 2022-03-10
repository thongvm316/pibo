import { useAuth } from '@/hooks/use-auth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Auth({ children }) {
  const router = useRouter();
  const { user, firstTimeLoading } = useAuth();

  useEffect(() => {
    if (!firstTimeLoading && !user?.id) router.push('/login');
  }, [router, user, firstTimeLoading]);

  if (!user?.id) return <p>Loading....</p>;

  return <div>{children}</div>;
}
