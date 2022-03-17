import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { columnLayout, gridPros } from './config';
import { dummyData } from './dummyData';
import useUnlockHistory from '@/hooks/manager-management/account-unlock/useUnlockHistory';

const Table = ({ formData }) => {
  const { data, isLoading, isError } = useUnlockHistory({
    ...formData,
    unlockFlg: formData.unlockFlg === 'all' ? '' : formData.unlockFlg,
  });

  //   const requestData = async () => {
  //     AUIGrid.showAjaxLoader(myGridID);

  //     console.log(data, isLoading, isError);

  //     AUIGrid.removeAjaxLoader(myGridID);
  //   };

  let myGridID: any;
  const createAUIGrid = () => {
    myGridID = AUIGrid.create('#grid_wrap_admin-lock', columnLayout, gridPros);

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

    AUIGrid.setGridData(myGridID, dummyData);
  };

  useEffect(() => {
    createAUIGrid();
  }, []);

  return <div id="grid_wrap_admin-lock"></div>;
};

Table.propTypes = {
  formData: PropTypes.object,
};

export default Table;
