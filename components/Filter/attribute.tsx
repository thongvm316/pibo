import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import FilterSection from '.';
import axiosClient from '@/api-client/axiosClient';

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

const Attribute = async () => {
  const attrOptions = await axiosClient.get('/pibo/pims/pip/attribute-groups');
  console.log(attrOptions);
  return (
    <FilterSection title="속성그룹" label="All">
      <Autocomplete
        size="small"
        disablePortal
        id="attr select"
        options={options}
        renderInput={(params) => <TextField {...params} hiddenLabel placeholder="전체" />}
      />
    </FilterSection>
  );
};

export default Attribute;
