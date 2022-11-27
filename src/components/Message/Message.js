import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export function Message (props) {
  const {
    sx,
    message,
    buttonLabel = 'GO BACK',
    iconVariant = 'info',
    onButtonClick,
    ...otherProps
  } = props
  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ...sx
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
          variant={'h5'}
          mb={'10px'}
        >
          {message}
        </Typography>
        <Button
          variant={'contained'}
          color={'secondary'}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Box>

  )
}

Message.propTypes = {
  sx: PropTypes.object,
  message: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  iconVariant: PropTypes.oneOf(['error', 'info']),
  onButtonClick: PropTypes.func.isRequired
}

export default Message
