import React from 'react'

import FullPageLayout from '../FullPageLayout'
import Loader from '../Loader'

export function FullPageLoader (props) {
  const {
    ...otherProps
  } = props

  return (
    <FullPageLayout>
      <Loader
        {...otherProps}
      />
    </FullPageLayout>
  )
}

export default FullPageLoader
