import React from 'react'

import { useFormContext } from 'react-hook-form'

import { FIELD_IS_REQUIRED_VALIDATION_ERROR } from '../../consts'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material'

export const ProfileForm = (props) => {
  const methods = useFormContext()

  const { register, formState: { errors } } = methods

  const registeredEmailProps = register('email')
  const registeredDisplayNameProps = register('displayName', {
    required: {
      value: true,
      message: FIELD_IS_REQUIRED_VALIDATION_ERROR
    }
  })
  return (
    <form
      autoComplete={'off'}
      {...props}
    >
      <Card>
        <CardHeader
          subheader={'The information can be edited'}
          title={'Profile'}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label={'First name and last name'}
                name={'First name and last name'}
                required
                variant={'outlined'}
                error={errors.displayName && errors.displayName.message}
                {...registeredDisplayNameProps}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label={'Email Address'}
                name={'email'}
                disabled={true}
                variant={'outlined'}
                error={errors.email && errors.email.message}
                helperText={errors.email}
                {...registeredEmailProps}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color={'primary'}
            variant={'contained'}
            type={'submit'}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}
export default ProfileForm
