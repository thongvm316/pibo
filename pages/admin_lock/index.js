import { useEffect } from 'react';

import FullLayout from '@/src/layouts/FullLayout';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';

import { columnLayout } from '@/assets/data/columnLayout';
import { footerLayout } from '@/assets/data/footerLayout';

const AdminLock = () => {
  var myGridID;
  useEffect(() => {
    var gridPros = {
      editable: true,
      enableFilter: true,
      autoGridHeight: true,
      usePaging: true,
    };
    myGridID = AUIGrid.create('#grid_wrap_admin-lock', columnLayout, gridPros);
  }, []);

  return (
    <Paper className="admin-lock" variant="outlined">
      <Typography className="admin-lock-title" sx={{ mb: 2, p: 2 }} variant="h4" component="div">
        계정 잠금 해제 관리
      </Typography>

      <Paper variant="outlined" sx={{ mx: 3, mb: 2 }} className="admin-lock-filter">
        <Grid container>
          <Grid item container justifyContent="space-between" xs={6}>
            {/* <Box className="admin-lock-filter__id" sx={{ display: 'flex' }}></Box> */}

            <Typography variant="subtitle1" component="div">
              ID
            </Typography>

            <TextField />
          </Grid>

          <Grid item xs={6}>
            <Box className="admin-lock-filter__id" sx={{ display: 'flex' }}>
              <Typography variant="subtitle1" component="div">
                잠금여부
              </Typography>

              <TextField />
            </Box>
          </Grid>
        </Grid>

        {/* <Box className="admin-lock-filter__status" sx={{ display: 'flex' }}>
          <Typography variant="subtitle1" component="div">
            잠금여부
          </Typography>

          <TextField />
        </Box> */}
      </Paper>

      <Stack spacing={1} sx={{ mx: 3, mb: 2 }} className="admin-lock-action" direction="row">
        <Button
          variant="contained"
          className="admin-lock-action__initial"
          startIcon={<ReplayIcon />}
        >
          초기화
        </Button>

        <Button
          variant="contained"
          className="admin-lock-action__lookup"
          startIcon={<SearchIcon />}
        >
          조회
        </Button>
      </Stack>

      <Box sx={{ maxWidth: '80%', mx: 3, mb: 2 }}>
        <div id="grid_wrap_admin-lock" />
        {/* Add pagination */}
      </Box>
    </Paper>
  );
};

export default AdminLock;

AdminLock.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
