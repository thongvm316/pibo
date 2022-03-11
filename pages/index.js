import React, { useEffect } from 'react';
import axios from 'axios';
import FullLayout from '@/src/layouts/FullLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Box, Grid } from '@mui/material';
import { columnLayout } from '@/assets/data/tableLayout';
import { footerLayout } from '@/assets/data/footerLayout';

import ProductPerfomance from '../src/components/dashboard/ProductPerfomance';
import SalesOverview from '../src/components/dashboard/SalseOverview';
import DailyActivity from '../src/components/dashboard/DailyActivity';

export default function Home() {
  //variable keep Id after create grid
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
    axios.get('/static/data/sample-data.json').then(
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
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerfomance />
        </Grid>
        <Grid item xs={12} lg={12}>
          <div id="grid_wrap" />
        </Grid>
      </Grid>
    </Box>
  );
}

Home.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
      // Will be passed to the page component as props
    },
  };
}
