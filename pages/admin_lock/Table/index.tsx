import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { columnLayout, gridPros } from './config';
import { dummyData, fakeData } from './dummyData';
import { convertDataStructure } from './utils';
import useUnlockHistory from '../hooks/useUnlockHistory';

const Table = ({ formData }: any) => {
  const { getData, unLockUser } = useUnlockHistory({
    ...formData,
    unlockFlg: formData.unlockFlg === 'all' ? '' : formData.unlockFlg,
  });

  const createAUIGridAndGetData = async () => {
    let myGridID: any;
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

    // AUIGrid.setGridData(myGridID, convertDataStructure(fakeData));
    // unLockUser({ userId: 'test1', aponCnsnNo: 'lorempicsum' });

    try {
      const { lockCancelHistory: data } = await getData();
      AUIGrid.setGridData(myGridID, convertDataStructure(data));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // createAUIGridAndGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="grid_wrap_admin-lock"></div>;
};

Table.propTypes = {
  formData: PropTypes.object,
};

export default Table;
