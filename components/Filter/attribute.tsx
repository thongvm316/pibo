import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import FilterSection from '.';
import axiosClient from '@/api-client/axiosClient';
import { GetStaticProps, GetServerSideProps } from 'next';

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

const Attribute = ({ data }: any) => {
  console.log('abc', data);

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

export const getStaticProps: GetStaticProps = async () => {
  const res = await axiosClient.get('/pibo/pims/bo/pip/attribute-groups');
  const data = res.data;
  return {
    props: {
      data: data,
    },
  };
};
