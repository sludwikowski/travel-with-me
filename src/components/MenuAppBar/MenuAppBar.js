import * as React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { AppBar, Box, Typography } from '@mui/material'

import { shades } from '../../theme'

export function MenuAppBar (props) {
  const navigate = useNavigate()
  const {
    sx,
    children
  } = props
  return (
    <AppBar
      elevation={10}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100vw',
        height: '100px',
        color: 'black',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '999',
        flexGrow: 1,
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'static',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80vw',
          margin: 'auto',
          ...sx
        }}

      >
        <Box
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          color={shades.secondary[400]}
        >
          <Typography
            variant={'h5'}
            color={shades.primary[400]}
            component={'div'}
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              '&:hover': { cursor: 'pointer' },
              '@media (max-width: 599.95px)': {
                fontSize: '16px'
              }
            }}
          >
            TRAVEL WITH ME
          </Typography>
        </Box>
        <Box>
          {children}
        </Box>
      </Box>
    </AppBar>
  )
}

MenuAppBar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
}

export default MenuAppBar
