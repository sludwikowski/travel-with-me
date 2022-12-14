import * as React from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material'

export function TravelCard (props) {
  const {
    travel = {},
    onClick
  } = props
  const {
    category,
    description,
    image,
    title,
    price
  } = travel
  return (
    <Grid
      item
      xs={12}
      sm={5}
      md={3}
    >
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          gutterBottom
          variant={'h4'}
          component={'h2'}
          textAlign={'center'}
          fontWeight={700}
          mt={5}
        >
          {title}
        </Typography>
        <CardMedia
          component={'img'}
          sx={{
            pt: '10.25%'
          }}
          image={image}
          alt={'random'}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant={'h6'}
            component={'h2'}
          >
            {category}
          </Typography>
          <Typography
            variant={'caption'}
            sx={{
              flexGrow: 1
            }}
          >
            {description}
          </Typography>
          <Typography
            variant={'caption'}
            sx={{
              flexGrow: 1
            }}
          >
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant={'contained'}
            color={'secondary'}
            size={'small'}
            type={'button'}
            disabled={!onClick}
            onClick={onClick}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export const TravelPropType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired

}).isRequired

TravelCard.propTypes = {
  travel: TravelPropType,
  onClick: PropTypes.func,
  price: PropTypes.number
}

export default TravelCard
