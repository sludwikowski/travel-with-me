import * as React from 'react'
import PropTypes from 'prop-types'

import { Grid, Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material'

export function TravelCard (props) {
  const {
    travel = {}
  } = props
  const {
    category,
    description,
    image,
    title
  } = travel
  return (

    <Grid
      item
      xs={12}
      sm={6}
      md={4}
    >
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          gutterBottom
          variant={'h3'}
          component={'h2'}
          textAlign={'center'}
          mt={5}
        >
          {title}
        </Typography>
        <CardMedia
          component={'img'}
          sx={{
            // 16:9
            pt: '10.25%'
          }}
          image={image}
          alt={'random'}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          {/* <Typography */}
          {/*  gutterBottom */}
          {/*  variant={'h3'} */}
          {/*  component={'h2'} */}
          {/* > */}
          {/*  {title} */}
          {/* </Typography> */}
          <Typography
            gutterBottom
            variant={'h6'}
            component={'h2'}
          >
            {category}
          </Typography>
          <Typography
            variant={'caption'}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant={'contained'}
            color={'secondary'}
            size={'small'}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>

  )
}

TravelCard.propTypes = {
  travel: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
}

export default TravelCard
