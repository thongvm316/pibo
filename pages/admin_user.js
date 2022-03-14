import axiosClient from '@/api-client/axiosClient';
import { useAuth } from '@/hooks/use-auth';
import BaseCard from '@/src/components/baseCard/BaseCard';
import FullLayout from '@/src/layouts/FullLayout';
import { useEffect } from 'react';

const AdminUser = () => {
  const { user } = useAuth();

  const columnLayout = [
    {
      dataField: 'userId',
      headerText: '관리자 계정',
    },
    {
      dataField: 'userNm',
      headerText: '관리자 권한',
    },
    {
      dataField: 'acctUsgYn',
      headerText: '잠금 여부',
    },
    {
      dataField: 'lastLoginDate',
      headerText: '마지막 로그인일시',
    },
    {
      dataField: 'lastModifyDate',
      headerText: '최종 수정일시',
    },
  ];

  useEffect(async () => {
    const test = await axiosClient.get('/pibo/api/users', {
      // params: {
      //   offset: 1,
      //   limit: 10,
      //   // acctUsgYn: 'N',
      // },
    });

    if (test) {
      const gridProps = {
        showRowNumColumn: false,
        autoGridHeight: true,
        usePaging: true,
        pagingMode: 'simple',
        // pagingBottomGap: 10,
        pageRowCount: 10,
      };

      const createDataGrid = AUIGrid.create('#table_data', columnLayout, gridProps);
      AUIGrid.setGridData(createDataGrid, test.userList);
      AUIGrid.bind(createDataGrid, 'pageChange', async (event) => {
        console.log('event', event);

        await axiosClient.get('/pibo/api/users', {
          // params: {
          //   offset: 1,
          //   limit: 10,
          //   // acctUsgYn: 'N',
          // },
        });
      });
    }
  }, []);

  return (
    <BaseCard title="관리자 관리">
      <div id="table_data" />
    </BaseCard>
  );
};

AdminUser.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};

export default AdminUser;
