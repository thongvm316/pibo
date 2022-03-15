import axiosClient from '@/api-client/axiosClient';
import { useAuth } from '@/hooks/use-auth';
import BaseCard from '@/src/components/baseCard/BaseCard';
import FullLayout from '@/src/layouts/FullLayout';
import { useEffect } from 'react';
import gridConfigs from './gridConfigs';

const AdminUser = () => {
  const { user } = useAuth();

  useEffect(async () => {
    const test = await axiosClient.get('/pibo/api/users', {
      // params: {
      //   offset: 1,
      //   limit: 10,
      //   // acctUsgYn: 'N',
      // },
    });

    if (test) {
      const createDataGrid = AUIGrid.create(
        '#table_data',
        gridConfigs.columnLayout,
        gridConfigs.gridProps
      );
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
