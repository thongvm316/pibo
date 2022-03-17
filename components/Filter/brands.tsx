import React from 'react'
import {Autocomplete, TextField} from '@mui/material'
import FilterSection from '.'

type Props = {}

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

const Brands = (props: Props) => {

  return (
    <FilterSection title="브랜드" label="All">
      <Autocomplete
        size="small"
        disablePortal
        id="search brand"
        options={options}
        renderInput={(params) => <TextField {...params} hiddenLabel placeholder="전체" />}
      />
    </FilterSection>
  );
}

export default Brands