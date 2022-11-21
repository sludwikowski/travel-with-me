import * as React from 'react'
// import RocketIcon from '@mui/icons-material/Rocket';
import { CircularProgress } from '@mui/material'

export function Loader () {
  return (
    <CircularProgress
      color={'success'}
      size={70}
    />
  )
}

export default Loader
