import { useEffect, useState, useRef, useMemo } from 'react';
import BaseCard from '@/components/baseCard/BaseCard';
import FullLayout from '@/components/Layout/FullLayout';
import authApi from '@/api-client/authApi';
import { useAuth } from '@/context/auth';
import {
  Box,
  Modal,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { gridProps } from '../../config/gridConfigs';
import useSWR from 'swr';

const AdminUser = () => {
  const { isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [detailUser, setDetailUser] = useState({});

  const columnLayout = [
    {
      dataField: 'userId',
      headerText: '관리자 계정',
      renderer: {
        type: 'LinkRenderer',
        linkField: 'userId',
        baseUrl: 'javascript',
        jsCallback: (rowIndex, columnIndex, value, item) => {
          setOpen(true);
          setUserId(value);
        },
      },
    },
    {
      dataField: 'authGrpNm',
      headerText: '관리자 권한',
    },
    {
      dataField: 'acctUsgYn',
      headerText: '잠금 여부',
    },
    {
      dataField: 'lstlinDttm',
      headerText: '마지막 로그인일시',
    },
    {
      dataField: 'lschTsp',
      headerText: '최종 수정일시',
    },
  ];

  const fetchProfile = async (url, userId) => {
    if (userId) {
      try {
        const res = await authApi.getUser(userId);
        return res.data;
      } catch (err) {}
    } else return null;
  };

  const { data: profile } = useSWR(['/api/user', userId], fetchProfile);

  useEffect(() => {
    if (isAuthenticated) {
      async function handleGetUsers() {
        try {
          const { data } = await authApi.getUserList();
          const tableData = AUIGrid.create(`#table_data`, columnLayout, gridProps);

          const gridData = data.userList.map((val) => {
            const listAuthGrpNm = val.userAuthList.flatMap((e) => e.authGrpNm);

            return { ...val, authGrpNm: listAuthGrpNm.join(', ') };
          });

          AUIGrid.setGridData(tableData, gridData);
          AUIGrid.bind(tableData, 'pageChange', async () => {
            await authApi.getUserList();
          });
        } catch (error) {
          alert(error);
        }
      }

      handleGetUsers();
    }
  }, [isAuthenticated]);

  const modalLayout = [
    {
      dataField: 'userId',
      headerText: '관리자 계정',
    },
    {
      dataField: 'userNm',
      headerText: '관리자 권한',
    },
    {
      dataField: 'orgNm',
      headerText: 'Org Name',
    },
    {
      dataField: 'cellTphn',
      headerText: 'TEL',
    },
    {
      dataField: 'userEmad',
      headerText: 'Email',
    },
    {
      dataField: 'lstlinDttm',
      headerText: 'Last login date',
    },
    {
      dataField: 'lstlinDttm',
      headerText: 'Last modified date',
    },
  ];

  // useEffect(async () => {
  //   if (open) {
  //     const getUser = await authApi.getUser('userId');
  //     const findId = document.getElementById('#modal_data');
  //     console.log('getUser', getUser);
  //     console.log('findId', findId);
  //     // console.log('findId', findId);
  //     // AUIGrid.create('#modal_data', modalLayout);
  //   }
  // }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <BaseCard title="관리자 관리">
      <div id="table_data" />
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <Typography>User detail information inquiry</Typography>
          {profile ? (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Account</TableCell>
                    <TableCell colSpan={3}>{profile?.userId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell colSpan={3}>{profile?.userNm}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dept name</TableCell>
                    <TableCell colSpan={3}>{profile?.orgNm}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Permission</TableCell>
                    <TableCell colSpan={3}>
                      {profile?.userAuthList?.map((item) => item?.authGrpNm).join(', ')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TELL</TableCell>
                    <TableCell colSpan={3}>{profile?.cellPhn}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HP</TableCell>
                    <TableCell colSpan={3}>{profile?.wirePhn}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell colSpan={3}>{profile?.userEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last login date</TableCell>
                    <TableCell>{profile?.lstlinDttm}</TableCell>
                    <TableCell>Last modified date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          ) : null}
        </Box>
      </Modal>
    </BaseCard>
  );
};

AdminUser.Layout = FullLayout;

export default AdminUser;
