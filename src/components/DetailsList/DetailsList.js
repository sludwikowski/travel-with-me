import React from 'react'
import PropTypes from 'prop-types'

// import Carousel from 'react-material-ui-carousel'

import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

function srcset (image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

export const DetailsList = (props) => {
  const {
    sx,
    details,
    children,
    ...otherProps
  } = props

  return (
    <Box>
      <ImageList
        style={{ overflow: 'hidden' }}
        variant={'quilted'}
        rowHeight={350}
        cols={2}
        sx={{
          '@media (max-width: 599.95px)': {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll'
          },
          ...sx
        }}
        {...otherProps}
      >
        {children}
        {
          details && details.map((detail) => {
            return (

              <ImageListItem
                key={detail.content}
                cols={detail.cols || 1}
                rows={detail.rows || 1}
                sx={{
                  opacity: '.9',
                  transition: 'opacity .3s linear',
                  cursor: 'pointer',
                  '&:hover': { opacity: 1 }
                }}
              >
                <img
                  {...srcset(detail.content, detail.rows, detail.cols)}
                  alt={detail.title}
                  loading={'lazy'}
                />

                <ImageListItemBar
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
