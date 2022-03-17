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
      <CardHeader title={title} titleTypographyProps={{ variant: 'h4', fontWeight: 'regular' }} sx={{ padding: 1}} />
      <Divider />
      <CardContent>
        {children}
      </CardContent>
    </Paper>
  );
};

export default FilterSection;

