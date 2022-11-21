import * as React from 'react'

import FullPageLayout from '../FullPageLayout'
import Message from '../Message'

export function FullPageMessage (props) {
  const {
    ...otherProps
  } = props

  return (
    <FullPageLayout>
      <Message
        {...otherProps}
      />
    </FullPageLayout>
  )
}

export default FullPageMessage
