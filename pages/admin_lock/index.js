import { useEffect } from 'react';

import FullLayout from '@/src/layouts/FullLayout';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
    };
    myGridID = AUIGrid.create('#grid_wrap_admin-lock', columnLayout, gridPros);
  }, []);

  return (
    <Paper className="admin-lock" elevation={3}>
      <Typography className="admin-lock-title" variant="h4" component="div">
        계정 잠금 해제 관리
      </Typography>

      <Box className="admin-lock-filter">
        <Box className="admin-lock-filter__id"></Box>

        <Box className="admin-lock-filter__status"></Box>
      </Box>

      <Stack spacing={2} className="admin-lock-action" direction="row">
        <Button
          variant="contained"
          className="admin-lock-action__initial"
          startIcon={<ReplayIcon />}
        >
          Contained
        </Button>

        <Button
          variant="contained"
          className="admin-lock-action__lookup"
          startIcon={<SearchIcon />}
        >
          Contained
        </Button>
      </Stack>

      <Box sx={{ width: '80%' }}>
        <div id="grid_wrap_admin-lock" />
      </Box>
    </Paper>
  );
};

export default AdminLock;

AdminLock.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
