import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext, Controller } from 'react-hook-form'

import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from '@mui/material'

import DetailsSelect, { DetailOptionsPropType } from '../DetailsSelect'

export const TravelForm = (props) => {
  const {
    sx,
    details,
    ...otherProps
  } = props

  const methods = useFormContext()
  const { register, control, formState: { errors } } = methods

  return (
    <Box
      component={'form'}
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <TextField
        {...register('title', {
          required: {
            value: true,
            message: 'Title is required'
          }
        })}
        label={'Title'}
        sx={{ width: '100%', marginBottom: 2 }}
        error={Boolean(errors.title)}
        helperText={errors.title && errors.title.message}
      />
      <TextField
        {...register('category', {
          required: {
            value: true,
            message: 'Category is required'
          }
        })}
        label={'Category'}
        sx={{ width: '100%', marginBottom: 2 }}
        error={Boolean(errors.category)}
        helperText={errors.category && errors.category.message}
      />
      <TextField
        {...register('image', {
          required: {
            value: true,
            message: 'Image URL is required'
          }
        })}
        label={'Image URL'}
        sx={{ width: '100%', marginBottom: 2 }}
        error={Boolean(errors.image)}
        helperText={errors.image && errors.image.message}
      />
      <TextField
        {...register('description', {
          required: {
            value: true,
            message: 'Description is required'
          }
        })}
        label={'Description'}
        multiline={true}
        sx={{ width: '100%', marginBottom: 2 }}
        error={Boolean(errors.description)}
        helperText={errors.description && errors.description.message}
      />
      <FormControl
        label={'Price'}
        sx={{ width: '100%', marginBottom: 2 }}
        error={Boolean(errors.price)}
        fullWidth
      >
        <InputLabel>
          Price
        </InputLabel>
        <FormHelperText>{errors.price && errors.price.message}</FormHelperText>
        <OutlinedInput
          {...register('price', {
            required: {
              value: true,
              message: 'Price is required'
            }
          })}
          type={'number'}
          id={'outlined-adornment-amount'}
          startAdornment={<InputAdornment position={'start'}>$</InputAdornment>}
          label={'Amount'}
        />
      </FormControl>
      <Controller
        control={control}
        name={'details'}
        rules={{
          required: {
            value: true,
            message: 'Details are required'
          }
        }}
        render={({
          field: { onChange, value }
        }) => (
          <DetailsSelect
            options={details}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Button
        color={'secondary'}
        variant={'contained'}
        sx={{ width: '100%' }}
        type={'submit'}
      >
        SAVE
      </Button>
    </Box>
  )
}

TravelForm.propTypes = {
  sx: PropTypes.object,
  details: DetailOptionsPropType
}

export default TravelForm
