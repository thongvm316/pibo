import * as React from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import { Tabs, Tab, Box } from '@mui/material';
import { Link } from 'next/link';

export default function BasicTabs(props) {
  const {
    state: { tabLists, selectTab },
    dispatch,
  } = props;

  const handleChange = (event, newValue) => {
    dispatch({ type: 'changeTab', payload: newValue });
  };

  const handleDeleteTab = (param, selectTab) => {
    dispatch({ type: 'deleteTab', payload: param });
    dispatch({ type: 'changeTab', payload: selectTab > 0 ? selectTab - 1 : null });
  };

  return (
    <>
      {tabLists.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={selectTab !== null ? selectTab : 0}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            {tabLists.map((item, i) => (
              <Tab
                component={Link}
                icon={<ClearIcon onClick={() => handleDeleteTab(item.text, selectTab)} />}
                iconPosition="end"
                key={i}
                href={item.linkTo}
                label={item.text}
              />
            ))}
          </Tabs>
        </Box>
      )}
    </>
  );
}
