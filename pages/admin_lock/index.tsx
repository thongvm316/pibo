import { useState } from 'react';

import FullLayout from '@/components/Layout/FullLayout';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from './Table';

import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';

const AdminLock = () => {
  const [formData, setFormData] = useState({
    userId: '',
    unlockFlg: 'all',
  });

  const handleChange = (event: any) => {
    setFormData((values) => ({
      ...values,
      [event.target.name || 'unlockFlg']: event.target.value,
    }));
  };

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

            <TextField size="small" name="userId" onChange={handleChange} />
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

            <Select
              sx={{ minWidth: 120 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value={formData.unlockFlg}
              onChange={handleChange}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="Y">잠금상태</MenuItem>
              <MenuItem value="N">해제완료</MenuItem>
            </Select>
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

      <Box sx={{ maxWidth: '100%', mx: 3, mb: 2 }}>
        <Table formData={formData} />
      </Box>
    </Paper>
  );
};

export default AdminLock;

AdminLock.Layout = FullLayout;
