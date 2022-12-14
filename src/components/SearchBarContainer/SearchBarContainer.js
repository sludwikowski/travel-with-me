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
      sx={{ p: '2px 4px', m: '15px auto', display: 'flex', alignItems: 'center', width: '75%', ...sx }}
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
