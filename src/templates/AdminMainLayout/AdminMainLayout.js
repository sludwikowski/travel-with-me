import React from 'react'
import PropTypes from 'prop-types'

import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export const AdminMainLayout = (props) => {
  const {
    sx,
    drawerOpen,
    setDrawerOpen,
    slotMainContent,
    slotAppBarTitle,
    slotDrawerContent,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <AppBar position={'sticky'}>
        <Toolbar>
          <IconButton
            size={'large'}
            edge={'start'}
            color={'secondary'}
            aria-label={'menu'}
            sx={{ marginRight: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={'h5'}
            component={'div'}
            sx={{ flexGrow: 1 }}
            color={'secondary'}
            fontWeight={700}
          >
            {slotAppBarTitle}
          </Typography>
          <Button

            color={'secondary'}
            variant={'contained'}
          >
            Go back
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: '250px' }}
        >
          {slotDrawerContent}
        </Box>
      </Drawer>
      <Container
        maxWidth={'md'}
      >
        {slotMainContent}
      </Container>
    </Box>
  )
}

AdminMainLayout.propTypes = {
  sx: PropTypes.object,
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  slotMainContent: PropTypes.node,
  slotAppBarTitle: PropTypes.node,
  slotDrawerContent: PropTypes.node
}

export default AdminMainLayout
