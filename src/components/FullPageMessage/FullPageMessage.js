import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export function FullPageMessage (props) {
  const {
    sx,
    message,
    buttonLabel = 'GO BACK',
    iconVariant = 'info',
    onButtonClick
  } = props
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        ...sx
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          dlignItems: 'center'
        }}
      >
        {
            iconVariant === 'info' ?
              <InfoOutlinedIcon
                sx={{ fontSize: 100 }}
              />
              :
              iconVariant === 'error' ?
                <ErrorOutlineIcon
                  sx={{ fontSize: 100 }}
                />
                :
                null
          }
        <Typography
          variant={'h3'}
        >
          {message}
        </Typography>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  )
}

FullPageMessage.propTypes = {
  sx: PropTypes.object,
  message: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  iconVariant: PropTypes.oneOf(['error', 'info']),
  onButtonClick: PropTypes.func.isRequired
}

export default FullPageMessage
