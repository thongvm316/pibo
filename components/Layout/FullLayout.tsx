import React from 'react';
import { experimentalStyled, useMediaQuery, Container, Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import Footer from '../Footer';
import { AppWrapper } from '@/context/AppContext';
import Auth from '../../common/auth';
import { LayoutProps } from '@/models';

const MainWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));

const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('lg')]: {
    paddingTop: '64px',
  },
  [theme.breakpoints.down('lg')]: {
    paddingTop: '64px',
  },
}));

const FullLayout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  return (
    <Auth>
      <AppWrapper>
        <MainWrapper>
          <Header
            sx={{
              paddingLeft: isSidebarOpen && lgUp ? '265px' : '',
              backgroundColor: '#fbfbfb',
            }}
            toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          <PageWrapper>
            <Container
              maxWidth={false}
              sx={{
                paddingTop: '20px',
                paddingLeft: isSidebarOpen && lgUp ? '280px!important' : '',
              }}
            >
              <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
              <Footer />
            </Container>
          </PageWrapper>
        </MainWrapper>
      </AppWrapper>
    </Auth>
  );
};

export default FullLayout;
