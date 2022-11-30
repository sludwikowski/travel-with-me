import * as React from 'react'
import PropTypes from 'prop-types'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Button, Box } from '@mui/material'

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
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6
        }}
      >
        <Container
          sx={{ py: 8 }}
          maxWidth={'md'}
        >
          {/* End hero unit */}
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
            >
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component={'img'}
                  sx={{
                    // 16:9
                    pt: '56.25%'
                  }}
                  image={`url(${image})`}
                  alt={'random'}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant={'h5'}
                    component={'h2'}
                  >
                    {title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant={'h5'}
                    component={'h2'}
                  >
                    {category}
                  </Typography>
                  <Typography>
                    {description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size={'small'}>View</Button>
                  <Button size={'small'}>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>

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
