import React, {useEffect} from 'react'
import axios from 'axios';
import BaseCard from '../../../components/baseCard/BaseCard';
import { columnLayout } from '@/public/assets/data/columnLayout';
import { footerLayout } from '@/public/assets/data/footerLayout';

export default function TableTest() {
    var myGridID;
    useEffect(() => {
      // 그리드 속성 설정
      var gridPros = {
        editable: true,
        enableFilter: true,
        // 세로 스크롤 없이 그리드 출력. 그리드 높이는 데이터에 따라 자동 결정됩니다.
        autoGridHeight: true,
      };
      // 실제로 #grid_wrap 에 그리드 생성
      myGridID = AUIGrid.create('#grid_wrap', columnLayout, gridPros);
      //Thuc thi yeu cau getdata
      getData();
      // return () => window.removeEventListener('load', myGridID);
    }, []);

    function getData() {
      axios.get('/static/data/revenue_region.json').then(
        (res) => {
          var gridData = res.data;
          console.log(gridData);
          AUIGrid.setGridData(myGridID, gridData);
          AUIGrid.setFooter(myGridID, footerLayout);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  return (
    <BaseCard title="Table Test">
      <div id="grid_wrap" />
    </BaseCard>
  );
}
