import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';

export default function CustomDatePicker() {
  const [value, setValue] = React.useState([null, null]);
  return (
    <DateRangePicker
      startText="Check-in"
      endText="Check-out"
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <TextField {...startProps} />
          <Box sx={{ mx: 2 }}> to </Box>
          <TextField {...endProps} />
        </React.Fragment>
      )}
    />
  );
}
