import React, { ReactElement } from 'react';
import {
  Paper,
  CardHeader,
  Divider,
  CardContent,
} from '@mui/material';

type FilterProps = {
  label: string;
  title: string;
  children: ReactElement;
};

const FilterSection = ({ title, label, children }: FilterProps) => {
  return (
    <Paper>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'subtitle2', fontWeight: 'fontWeightBold' }}
        sx={{ padding: '4px' }}
      />
      <Divider />
      <CardContent sx={{
        '&.MuiCardContent-root':{
          padding: 1
        }
      }}>{children}</CardContent>
    </Paper>
  );
};

export default FilterSection;

