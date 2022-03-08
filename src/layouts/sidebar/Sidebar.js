import React, { useEffect, useState } from "react"
import NextLink from "next/link"
import PropTypes from "prop-types"
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from "@mui/material"
import FeatherIcon from "feather-icons-react"
import Logo from "../logo/Logo"
import Menuitems from "./MenuItems"
import { useRouter } from "next/router"
import axiosClient from "@/api-client/axiosClient"
import { hasChildren } from "./utils"

const SingleLevel = ({ subMenuList, nestedLevel }) => {
  return (
    <NextLink href={subMenuList.menuId.toLowerCase()}>
      <ListItemButton sx={{ pl: nestedLevel }}>
        <ListItemText primary={subMenuList.menuNm} />
      </ListItemButton>
    </NextLink>
  )
}

const MultiLevel = ({ subMenuList, nestedLevel }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick} sx={{ pl: nestedLevel }}>
        <ListItemText primary={subMenuList.menuNm} />
        {open ? <FeatherIcon icon="chevron-up" /> : <FeatherIcon icon="chevron-down" />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenuList.subMenu.map((subMenu, key) => (
            <MenuItem key={key} subMenuList={subMenu} nestedLevel={nestedLevel + 2} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

const MenuItem = ({ subMenuList, nestedLevel }) => {
  const Component = hasChildren(subMenuList) ? MultiLevel : SingleLevel
  return <Component subMenuList={subMenuList} nestedLevel={nestedLevel} />
}

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true)
  const [menuList, setMenuList] = React.useState([])

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"))

  const handleClick = (index) => {
    setOpen({ [index]: true })
  }
  let curl = useRouter()
  const location = curl.pathname

  useEffect(() => {
    const callApi = axiosClient({
      method: "get",
      url: "https://i-dev-piboapi.amorepacific.com/pibo/api/menu",
    })

    callApi.then((response) => setMenuList(response.menuList))
  }, [])

  const SidebarContent = (
    <Box p={3} height="100%">
      <Logo linkTo="/" title="Back Office" />
      <Box mt={2}>
        <List>
          {menuList.map((subMenuList, index) => (
            <MenuItem key={index} subMenuList={subMenuList} nestedLevel={2} />
          ))}
        </List>
      </Box>

      {/* <Buynow /> */}
    </Box>
  )
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    )
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  )
}

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
}

export default Sidebar
