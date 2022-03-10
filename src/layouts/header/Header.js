import React from "react"
import FeatherIcon from "feather-icons-react"
import { AppBar, Box, IconButton, Toolbar } from "@mui/material"
import PropTypes from "prop-types"
// Dropdown Component
import ProfileDD from "./ProfileDD"
import MultiTab from "../tab/Tab"
import { useAppContext } from "@/src/context/AppContext"

const Header = ({ sx, customClass, toggleMobileSidebar, position }) => {
  const {
    state: { tabLists, selectTab },
    dispatch,
  } = useAppContext()

  return (
    <AppBar sx={sx} position={position} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>

        <MultiTab {...useAppContext()} />

        <Box flexGrow={1} />

        <ProfileDD />
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
}

export default Header
