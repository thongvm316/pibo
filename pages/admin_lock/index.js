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

import { columnLayout, gridPros } from './Table/config';
import { dummyData } from './Table/dummyData';

const AdminLock = () => {
  var myGridID;
  useEffect(() => {
    myGridID = AUIGrid.create('#grid_wrap_admin-lock', columnLayout, gridPros);

    AUIGrid.bind(myGridID, 'pageChange', function (event) {
      console.log('pageChange');
      const ellapseEl = document.getElementById('ellapse');
      if (ellapseEl) {
        ellapseEl.innerHTML =
          '페이지 변경 이벤트 : ' +
          event.oldPage +
          ' → ' +
          event.currentPage +
          ', 전체 페이지 수 : ' +
          event.totalPageCount;
      }
    });

    AUIGrid.setGridData(myGridID, dummyData);
  }, []);

  return (
    <Paper className="admin-lock" variant="outlined">
      <Typography className="admin-lock-title" sx={{ mb: 2, p: 2 }} variant="h4" component="div">
        계정 잠금 해제 관리
      </Typography>

      <Box sx={{ mx: 3, mb: 2 }} className="admin-lock-filter">
        <Grid container>
          <Grid item container justifyContent="flex-start" alignItems="center" xs={6}>
            <Typography
              className="admin-lock-filter__title"
              sx={{ mr: 2, p: 1 }}
              variant="subtitle1"
              component="div"
            >
              ID
            </Typography>

            <TextField size="small" />
          </Grid>

          <Grid item container justifyContent="flex-start" alignItems="center" xs={6}>
            <Typography
              className="admin-lock-filter__title"
              sx={{ mr: 2, p: 1 }}
              variant="subtitle1"
              component="div"
            >
              잠금여부
            </Typography>

            <TextField size="small" />
          </Grid>
        </Grid>
      </Box>

      <Stack
        spacing={1}
        sx={{ mx: 3, mb: 2 }}
        className="admin-lock-action"
        justifyContent="center"
        direction="row"
      >
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

      <Box sx={{ maxWidth: '80%', mx: 3, mb: 2 }} id="grid_wrap_admin-lock">
        {/* Add pagination */}
      </Box>
    </Paper>
  );
};

export default AdminLock;

AdminLock.Layout = FullLayout;
