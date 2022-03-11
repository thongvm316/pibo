import * as React from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import { Tabs, Tab, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(12),
  marginRight: theme.spacing(1),
  backgroundColor: '#F5F7FB',
}));

export default function BasicTabs(props) {
  const router = useRouter();
  const [isPreventClick, setIsPreventClick] = React.useState(false);

  const handleOnMouseEnter = (e) => {
    setIsPreventClick(true);
  };

  const handleOnMouseLeave = (e) => {
    setIsPreventClick(false);
  };

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

  const handleClick = (url) => {
    if (isPreventClick) return;
    router.push(url);
  };

  return (
    <>
      {tabLists.length > 0 && (
        <Box
          sx={{
            width: '80%',
            '& .MuiTabs-root': {
              height: '40px',
              minHeight: 'unset',
              alignItems: 'center',
            },
          }}
        >
          <StyledTabs
            value={selectTab !== null ? selectTab : 0}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabLists.map((item, i) => (
              <StyledTab
                icon={
                  <ClearIcon
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => handleDeleteTab(item.menuId, selectTab)}
                    sx={{ fontSize: 12 }}
                  />
                }
                iconPosition="end"
                key={i}
                onClick={() => handleClick(item.menuId.toLowerCase())}
                label={item.menuNm}
              />
            ))}
          </StyledTabs>
        </Box>
      )}
    </>
  );
}
