import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

function MenuAppBar (props) {
  const {
    sx,
    children
  } = props
  return (
    <Box
      sx={{ flexGrow: 1 }}
    >
      <AppBar
        position={'static'}
        sx={{ display: { xs: 'flex', sm: 'block' }, ...sx }}
      >
        <Container maxWidth={'xl'}>
          <Toolbar
            disableGutters
            sx={{ pt: '20px', pb: '20px', ...sx }}
          >
            <RocketLaunchIcon
              sx={{ fontSize: '45px', mr: 1, color: 'red' }}
              edge={'start'}
              color={'inherit'}
            />
            <Typography
              variant={'h5'}
              noWrap
              component={'div'}
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              TRAVEL WITH ME
            </Typography>
            {children}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

MenuAppBar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
}

export default MenuAppBar
