import { useAuth } from '@/hooks/use-auth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';

export default function Auth({ children }) {
  const router = useRouter();
  const { user, firstTimeLoading, error } = useAuth();

  useEffect(() => {
    if (!firstTimeLoading && !user?.userList) {
      router.push('/login');
    }
  }, [router, user, firstTimeLoading]);

  if (!user?.userList)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  return <div>{children}</div>;
}
