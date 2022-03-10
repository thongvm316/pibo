import { useAuth } from '@/hooks/use-auth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export default function Auth({ children }) {
  const router = useRouter();
  const { user, firstTimeLoading, error } = useAuth();

  useEffect(() => {
    if (!firstTimeLoading && !user?.userList) {
      // router.push('/login');
    }
  }, [router, user, firstTimeLoading]);

  if (!user?.userList) {
    const boxStyle = {
      height: '100%',
      width: '100%',
      display: 'flex',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <Box sx={boxStyle}>
        <CircularProgress />
      </Box>
    );
  }

  return <div>{children}</div>;
}
