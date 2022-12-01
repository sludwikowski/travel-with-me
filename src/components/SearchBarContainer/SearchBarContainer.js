import * as React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@mui/material'

export function SearchBarContainer (props) {
  const {
    sx,
    children
  } = props
  return (
    <Container
      sx={{ py: 2, ...sx }}
      maxWidth={'md'}
    >
      {children}
    </Container>

  )
}

SearchBarContainer.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
}
export default SearchBarContainer
