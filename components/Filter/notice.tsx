<<<<<<< HEAD
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import FilterSection from '.';

type Props = {};

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

const Notice = (props: Props) => {
  return (
    <FilterSection title="고시품목" label="All">
      <Autocomplete
        size="small"
        disablePortal
        id="search brand"
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            hiddenLabel
            placeholder="전체"
          />
        )}
      />
    </FilterSection>
  );
};

export default Notice;
=======
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import FilterSection from '.';

type Props = {};

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

const Notice = (props: Props) => {
  return (
    <FilterSection title="고시품목" label="All">
      <Autocomplete
        size="small"
        disablePortal
        id="search brand"
        options={options}
        renderInput={(params) => <TextField {...params} hiddenLabel placeholder="전체" />}
      />
    </FilterSection>
  );
};

export default Notice;
>>>>>>> 52553674e9d1579c27fe03b12191cc58faac8edd
