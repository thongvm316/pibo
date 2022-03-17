import { useEffect, useState, useRef, useMemo } from 'react';
import BaseCard from '@/components/baseCard/BaseCard';
import FullLayout from '@/components/Layout/FullLayout';
import authApi from '@/api-client/authApi';
import { useAuth } from '@/context/auth';
import { Box, Modal, Typography } from '@mui/material';
import { columnLayout, gridProps } from '../../config/gridConfigs';

const AdminUser = () => {
  const { isAuthenticated } = useAuth();
  const testData = useRef(null);

  const [open, setOpen] = useState(false);
  const [detailUser, setDetailUser] = useState({});

  // const columnLayout = [
  //   {
  //     dataField: 'userId',
  //     headerText: '관리자 계정',
  //     renderer: {
  //       type: 'LinkRenderer',
  //       linkField: 'userId',
  //       baseUrl: 'javascript',
  //       jsCallback: () => {
  //         setOpen(true);
  //       },
  //     },
  //   },
  //   {
  //     dataField: 'userNm',
  //     headerText: '관리자 권한',
  //   },
  //   {
  //     dataField: 'acctUsgYn',
  //     headerText: '잠금 여부',
  //   },
  //   {
  //     dataField: 'lastLoginDate',
  //     headerText: '마지막 로그인일시',
  //   },
  //   {
  //     dataField: 'lastModifyDate',
  //     headerText: '최종 수정일시',
  //   },
  // ];

  useEffect(() => {
    if (isAuthenticated) {
      async function handleGetUsers() {
        try {
          const { data } = await authApi.getUserList();
          const getId = testData.current.id;
          const tableData = AUIGrid.create(`#${getId}`, columnLayout, gridProps);
          AUIGrid.setGridData(tableData, data.userList);
          AUIGrid.bind(tableData, 'pageChange', async () => {
            await authApi.getUserList();
          });
        } catch (error) {
          alert(error);
        }
      }

      handleGetUsers();
    }
  }, []);

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
      <div id="table_data" ref={testData} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <div id="modal_data" />
        </Box>
      </Modal>
    </BaseCard>
  );
};

AdminUser.Layout = FullLayout;

export default AdminUser;
