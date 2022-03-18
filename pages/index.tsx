import { Box, Grid } from '@mui/material';
// import ProductPerfomance from '@/components/Dashboard/ProductPerfomance';
// import SalesOverview from '@/components/Dashboard/SalseOverview';
// import DailyActivity from '@/components/Dashboard/DailyActivity';
// import TableTest from '@/components/Dashboard/TableTest';
import CustomDatePicker from '@/components/DateRangePicker';
import { NextPageWithLayout } from '@/models';
import FullLayout from '@/components/Layout/FullLayout';

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          {/* <SalesOverview /> */}
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          {/* <DailyActivity /> */}
        </Grid>
        <Grid item xs={12} lg={8}>
          {/* <ProductPerfomance /> */}
        </Grid>
        <Grid item xs={12} lg={12}>
          {/* <TableTest /> */}
          {/* <CustomDatePicker /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

Home.Layout = FullLayout;
