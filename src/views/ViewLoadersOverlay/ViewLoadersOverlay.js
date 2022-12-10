import React from 'react'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'

import FullPageMessage from '../../components/FullPageMessage'
import FullPageLoader from '../../components/FullPageLoader'

import {
  createActionRemoveError,
  createActionRemoveInfo
} from '../../state/loaders'

import { Box } from '@mui/material'

export const ViewLoadersOverlay = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const {
    isLoading,
    loadingMessage,
    hasError,
    errorMessage,
    isInfoDisplayed,
    infoMessage
  } = useSelector((state) => state.loaders)
  const dispatch = useDispatch()

  const dismissError = React.useCallback(() => {
    dispatch(createActionRemoveError())
  }, [dispatch])

  const dismissMessage = React.useCallback(() => {
    dispatch(createActionRemoveInfo())
  }, [dispatch])

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      {
        isLoading ?
          <FullPageLoader
            message={loadingMessage}
          />
          :
          null
      }
      {
        isInfoDisplayed ?
          <FullPageMessage
            message={infoMessage}
            iconVariant={'info'}
            buttonLabel={'OK'}
            onButtonClick={dismissMessage}
          />
          :
          null
      }
      {
        hasError ?
          <FullPageMessage
            message={errorMessage}
            iconVariant={'error'}
            onButtonClick={dismissError}
          />
          :
          null
      }

    </Box>
  )
}

ViewLoadersOverlay.propTypes = {
  sx: PropTypes.object
}

export default ViewLoadersOverlay
