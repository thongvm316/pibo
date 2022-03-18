import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Collapse,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import Logo from '@/components/Logo/Logo';
import { hasChildren } from './utils';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppContext } from '@/context/AppContext';
import { ExpandLess, ExpandMore, Groups, Pageview } from '@mui/icons-material';

const SingleLevel = ({ subMenuList, nestedLevel }) => {
  const {
    state: { tabLists },
    dispatch,
  } = useAppContext();

  const handleTabsList = () => {
    const hasTabInLists = tabLists.map((item) => item?.menuId).includes(subMenuList?.menuId);

    if (!hasTabInLists) {
      dispatch({ type: 'addTab', payload: subMenuList });
      dispatch({ type: 'changeTab', payload: tabLists.length > 0 ? tabLists.length : 0 });
    }
  };

  return (
    <NextLink passHref href={subMenuList.menuId.toLowerCase()}>
      <ListItemButton sx={{ pl: nestedLevel }} onClick={handleTabsList}>
        <ListItemIcon>
          <Pageview />
        </ListItemIcon>
        <ListItemText primary={subMenuList.menuNm} />
      </ListItemButton>
    </NextLink>
  );
};

const MultiLevel = ({ subMenuList, nestedLevel, icon }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List disablePadding>
      <ListItemButton onClick={handleClick} sx={{ pl: nestedLevel }}>
        {icon && (
          <ListItemIcon>
            <Groups />
          </ListItemIcon>
        )}
        <ListItemText primary={subMenuList.menuNm} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenuList.subMenu.map((subMenu, key) => (
            <MenuItem key={key} subMenuList={subMenu} nestedLevel={nestedLevel + 2} icon={true} />
          ))}
        </List>
      </Collapse>
    </List>
  );
};

const MenuItem = ({ subMenuList, nestedLevel, icon }) => {
  const Component = hasChildren(subMenuList) ? MultiLevel : SingleLevel;

  return <Component subMenuList={subMenuList} nestedLevel={nestedLevel} icon={icon} />;
};

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  let [storageMenuList] = useLocalStorage('menuList');
  const [menuList, setMenuList] = React.useState([]);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    storageMenuList = storageMenuList ?? { menuList: [] };
    let newMenuList = [];
    const PIMSProduct = storageMenuList.menuList.find((menu) => menu.menuId === 'PIMS_PRODUCT');

    if (PIMSProduct) {
      const PIMSProductMenu = PIMSProduct.subMenu;
      newMenuList = newMenuList.concat(PIMSProductMenu);
    }

    const notPIMSProductList = storageMenuList.menuList.filter(
      (menu) => menu.menuId !== 'PIMS_PRODUCT'
    );

    newMenuList = newMenuList.concat(notPIMSProductList);
    setMenuList(newMenuList);
  }, []);

  const SidebarContent = (
    <Box p={1} width="255px" height="100%">
      <Logo linkTo="/" src="/static/images/logos/logo.png" title="PIBO" />
      <Box>
        <List>
          {menuList.map((subMenuList, index) => (
            <MenuItem key={index} subMenuList={subMenuList} nestedLevel={2} />
          ))}
        </List>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: '265px',
            border: '0 !important',
            boxShadow: '0px 7px 30px 0px rgb(113 122 131 / 11%)',
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: '265px',
          border: '0 !important',
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
