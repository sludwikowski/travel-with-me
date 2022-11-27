import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

function MenuAppBar (props) {
  const {
    sx,
    children
  } = props
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position={'static'}
        sx={{ pl: '200px', pr: '200px', display: { xs: 'flex' }, ...sx }}
      >
        <Toolbar >
          <RocketLaunchIcon
            sx={{ fontSize: '45px', mr: 2, color: 'red' }}
            edge={'start'}
            color={'inherit'}
            aria-label={'open drawer'}
          />
          <Typography
            variant={'h5'}
            noWrap
            component={'div'}
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            TRAVEL WITH ME
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

MenuAppBar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
}

export default MenuAppBar
