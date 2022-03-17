import React, { useState } from 'react';
import FullLayout from '@/components/Layout/FullLayout';
import { Box, Grid, Paper, TextField, Autocomplete, Button, InputAdornment } from '@mui/material';
import FilterSection from '@/components/Filter';
// import TableTest from '@/components/Dashboard/TableTest';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { MdRestore, MdSearch, MdOutlineCalendarToday } from 'react-icons/md';
import Attribute from '@/components/Filter/attribute';
import Brands from '@/components/Filter/brands';
import Classification from '@/components/Filter/classification';
import Notice from '@/components/Filter/notice';

const Product = () => {
  const [regDate, setRegDate] = useState<[any, any]>([null, null]);
  const [modDate, setModDate] = useState<[any, any]>([null, null]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginBottom: 2 }}
      >
        <Grid item xs={2} sm={3} md={3}>
          <Brands />
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <Classification />
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <Attribute />
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <Notice />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginBottom: 2 }}
      >
        <Grid item xs={2} sm={6} md={6}>
          <FilterSection title="상품명" label="All">
            <DateRangePicker
              value={regDate}
              endText=""
              startText=""
              onChange={(newValue) => {
                setRegDate(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField
                    {...startProps}
                    size="small"
                    fullWidth
                    hiddenLabel
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdOutlineCalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ mx: 1 }}> </Box>
                  <TextField
                    {...endProps}
                    size="small"
                    fullWidth
                    hiddenLabel
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdOutlineCalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                </React.Fragment>
              )}
            />
          </FilterSection>
        </Grid>
        <Grid item xs={2} sm={6} md={6}>
          <FilterSection title="수정자" label="All">
            <DateRangePicker
              endText=""
              startText=""
              value={modDate}
              onChange={(newValue) => {
                setModDate(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField
                    {...startProps}
                    size="small"
                    fullWidth
                    hiddenLabel
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdOutlineCalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ mx: 1 }}> </Box>
                  <TextField
                    {...endProps}
                    size="small"
                    hiddenLabel
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdOutlineCalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                </React.Fragment>
              )}
            />
          </FilterSection>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginBottom: 2 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <FilterSection title="상품명" label="All">
            <TextField id="outlined-basic" hiddenLabel size="small" variant="outlined" fullWidth />
          </FilterSection>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <FilterSection title="수정자" label="All">
            <TextField id="outlined-basic" hiddenLabel size="small" variant="outlined" fullWidth />
          </FilterSection>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <FilterSection title="SAP코드" label="All">
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              fullWidth
              placeholder="콤마(,)로 구분하여 여러개의 상품 조회가 가능합니다."
            />
          </FilterSection>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
        <Button variant="contained" startIcon={<MdRestore />}>
          초기화
        </Button>
        <Box sx={{ mx: 1 }}> </Box>
        <Button variant="contained" color="secondary" startIcon={<MdSearch />}>
          조회
        </Button>
      </Box>
      {/* <TableTest /> */}
    </Box>
  );
};

Product.Layout = FullLayout;

export default Product;

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
