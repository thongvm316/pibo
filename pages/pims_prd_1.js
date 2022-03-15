import FullLayout from '@/components/Layout/FullLayout';
import TestRender from '@/components/TestRender';
import CustomDatePicker from '@/components/DateRangePicker';
import { Box } from '@mui/material';

const Prd1 = () => {
  return (
    <Box>
      <TestRender
        urlImg="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        content="uptatum, fames incididunt, mus eius, diam senectus veniam justo omnis fugit, occaecat pharetra maiores, minus auctor? Bibendum autem dolores ridiculus dui magna. Amet dolor mauris porro, eveniet"
      />
      <CustomDatePicker />
    </Box>
  );
};

export default Prd1;

Prd1.Layout = FullLayout;
