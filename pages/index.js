import React from 'react';
import FullLayout from '@/src/layouts/FullLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Box, Grid } from '@mui/material';
import ProductPerfomance from '../src/components/dashboard/ProductPerfomance';
import SalesOverview from '../src/components/dashboard/SalseOverview';
import DailyActivity from '../src/components/dashboard/DailyActivity';
import TableTest from '@/src/components/dashboard/TableTest';

export default function Home() {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerfomance />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TableTest />
        </Grid>
      </Grid>
    </Box>
  );
}

Home.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
      // Will be passed to the page component as props
    },
  };
}
