import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

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
import Modal from './Modal';
// import Table from './Table';

import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';

import useUnlockHistory from './hooks/useUnlockHistory';
import { convertDataStructure } from './Table/utils';
import { gridPros } from './Table/config';
// import { dummyData, fakeData } from './Table/dummyData';

const AdminLock = () => {
  const initialState = {
    userId: '',
    unlockFlg: 'all',
  };

  const [formData, setFormData] = useState(initialState);

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const ref = useRef();
  const router = useRouter();

  const { getData, unLockUser } = useUnlockHistory({
    ...formData,
    unlockFlg: formData.unlockFlg === 'all' ? '' : formData.unlockFlg,
  });

  const handleChange = (event: any) => {
    setFormData((values) => ({
      ...values,
      [event.target.name || 'unlockFlg']: event.target.value,
    }));
  };

  const initializationPage = () => {
    router.reload();
  };

  const columnLayout = [
    {
      dataField: 'userId',
      headerText: '사용자 계정',
    },
    {
      dataField: 'linIp',
      headerText: 'IP',
    },
    {
      dataField: 'linDttm',
      headerText: '잠금 일시',
    },
    {
      dataField: 'acctLockCancDttm',
      headerText: '해제 일시',
    },
    {
      dataField: 'aponCnsnNo',
      headerText: '계정 잠금 해제 근거 문서번호',
      width: 200,
    },
    {
      dataField: 'fscrId',
      headerText: 'PIC',
    },
    {
      dataField: 'button',
      headerText: 'Unlocking',
      dataType: 'numeric',
      renderer: {
        type: 'ButtonRenderer',
        onClick: function ({ item: { userId, aponCnsnNo } }: any) {
          setOpen(true);
          setUserId(userId);
        },
        visibleFunction: function (
          rowIndex: any,
          columnIndex: any,
          value: any,
          item: any,
          dataField: any
        ) {
          if (item.acctLockCancDttm) {
            return false;
          }
          return true;
        },
      },
    },
  ];

  // const getUnLockHistory = async () => {
  //   try {
  //     AUIGrid.showAjaxLoader(myGridID);
  //     const data = await getData();
  //     AUIGrid.removeAjaxLoader(myGridID);

  //     AUIGrid.setGridData(myGridID, convertDataStructure(data?.lockCancelHistory));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createAUIGridAndGetData = async () => {
    const myGridID = AUIGrid.create('#grid_wrap_admin-lock', columnLayout, gridPros);

    AUIGrid.bind(myGridID, 'pageChange', function (event: any) {
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

    try {
      AUIGrid.showAjaxLoader(myGridID);
      const data = await getData();
      AUIGrid.removeAjaxLoader(myGridID);

      AUIGrid.setGridData(myGridID, convertDataStructure(data?.lockCancelHistory));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createAUIGridAndGetData();
    if (!ref.current.querySelector('.aui-grid')) {
      router.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <MenuItem value="N">잠금상태</MenuItem>
              <MenuItem value="Y">해제완료</MenuItem>
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
          onClick={initializationPage}
        >
          초기화
        </Button>

        <Button
          variant="contained"
          className="admin-lock-action__lookup"
          startIcon={<SearchIcon />}
          onClick={createAUIGridAndGetData}
        >
          조회
        </Button>
      </Stack>

      <Box sx={{ maxWidth: '80%', minWidth: '1255px', width: '100%', mx: 3, mb: 2 }}>
        <div id="grid_wrap_admin-lock" ref={ref}></div>
      </Box>

      <Modal
        open={open}
        setOpen={setOpen}
        unLockUser={unLockUser}
        userId={userId}
        createAUIGridAndGetData={createAUIGridAndGetData}
      />
    </Paper>
  );
};

export default AdminLock;

AdminLock.Layout = FullLayout;
