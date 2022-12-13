import React from 'react'
import PropTypes from 'prop-types'

import { Outlet, useNavigate } from 'react-router-dom'

import { Box, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'

import AdminMainLayout from '../../templates/AdminMainLayout/AdminMainLayout'

export const PageAdminMain = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <AdminMainLayout
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        slotAppBarRight={
          <Button
            color={'secondary'}
            variant={'contained'}
            onClick={() => navigate('/')}
          >Go back
          </Button>
      }
        slotMainContent={<Outlet />}
        slotAppBarTitle={'ADMIN PANEL'}
        slotDrawerContent={
          <List>
            <ListItem
              disablePadding={true}
            >
              <ListItemButton
                onClick={() => {
                  navigate('details')
                  setDrawerOpen(false)
                }}
              >
                <ListItemText primary={'Details'} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding={true}
            >
              <ListItemButton
                onClick={() => {
                  navigate('travels')
                  setDrawerOpen(false)
                }}
              >
                <ListItemText primary={'Travels'} />
              </ListItemButton>
            </ListItem>
          </List>
        }
      />
    </Box>
  )
}

PageAdminMain.propTypes = {
  sx: PropTypes.object
}

export default PageAdminMain
