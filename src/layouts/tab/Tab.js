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
  const [isDetectRemoveTab, setIsDetectRemoveTab] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleOnMouseEnter = (e) => {
    setIsPreventClick(true);
  };

  const handleOnMouseLeave = (e) => {
    setIsPreventClick(false);
  };

  const {
    state: { tabLists },
    dispatch,
  } = props;

  const handleChange = (event, newValue) => {
    if (isPreventClick) return;
    setValue(newValue);
  };

  const handleDeleteTab = (param, index) => {
    setIsPreventClick(false);
    setIsDetectRemoveTab(true);

    dispatch({ type: 'deleteTab', payload: param });

    // Tabs: A B C D
    if (value === tabLists.length - 1) {
      setValue(value > 0 ? value - 1 : 0); // at D - del D
    } else if (value > index) {
      setValue(value - 1); // at B - del C or D
    }
  };

  const handleClick = (url) => {
    if (isPreventClick) return;
    router.push(url);
  };

  // go to last item when delete lastIndex in tabLists
  React.useEffect(() => {
    if (!isDetectRemoveTab) return;
    setIsDetectRemoveTab(false);

    if (value === tabLists.length - 1) {
      const lastItemInTabList = tabLists[tabLists.length - 1];
      if (lastItemInTabList) router.push(`/${lastItemInTabList?.menuId.toLowerCase()}`);
    }
  }, [isDetectRemoveTab]);

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
            value={value}
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
                    onClick={() => handleDeleteTab(item.menuId, i)}
                    sx={{ fontSize: 12 }}
                  />
                }
                iconPosition="end"
                key={i}
                onClick={() => handleClick(`/${item.menuId.toLowerCase()}`)}
                label={item.menuNm}
              />
            ))}
          </StyledTabs>
        </Box>
      )}
    </>
  );
}
