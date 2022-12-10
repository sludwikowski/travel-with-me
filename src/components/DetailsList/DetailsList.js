import React from 'react'
import PropTypes from 'prop-types'

import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

export const DetailsList = (props) => {
  const {
    sx,
    details,
    children,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <ImageList
        variant={'masonry'}
        cols={2}
        gap={8}
        sx={{
          '@media (max-width: 599.95px)': {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll'
          }
        }}
      >
        {children}
        {
          details && details.map((detail) => {
            return (
              <ImageListItem key={detail.content} >
                <img
                  src={`${detail.content}?w=248&fit=crop&auto=format`}
                  srcSet={`${detail.content}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={detail.title}
                  loading={'lazy'}
                />
                <ImageListItemBar
                  position={'below'}
                  title={detail.title}
                />
              </ImageListItem>
            )
          })
        }
      </ImageList>
    </Box>
  )
}

DetailsList.propTypes = {
  sx: PropTypes.object,
  details: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node
}

export default DetailsList
