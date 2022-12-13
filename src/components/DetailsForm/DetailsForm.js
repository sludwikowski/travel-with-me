import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext, Controller } from 'react-hook-form'

import { Box, FormHelperText, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export const DetailsForm = (props) => {
  const {
    sx,
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
        {...register('content', {
          required: {
            value: true,
            message: 'Image URL is required'
          }
        })}
        label={'Image URL'}
        sx={{ width: '100%', marginBottom: 2 }}
        error={Boolean(errors.content)}
        helperText={errors.content && errors.content.message}
      />
      <Controller
        control={control}
        name={'type'}
        rules={{
          required: {
            value: true,
            message: 'Type is required'
          }
        }}
        render={({
          field: { onChange, value }
        }) => (
          <FormControl
            sx={{ width: '100%', marginBottom: 2 }}
            error={Boolean(errors.type)}
          >
            <InputLabel
              size={'small'}
              id={'form-detail-select-label'}
            >
              Type
            </InputLabel>
            <Select
              value={value}
              onChange={onChange}
              labelId={'form-detail-select-label'}
              id={'form-detail-select'}
              label={'Type'}
            >
              <MenuItem value={'image'}>Image</MenuItem>
            </Select>
            {
              errors.type ?
                <FormHelperText>{errors.type.message}</FormHelperText>
                :
                null
            }
          </FormControl>
        )}
      />
      <Button
        variant={'contained'}
        color={'secondary'}
        sx={{ width: '100%' }}
        type={'submit'}
      >
        SAVE
      </Button>
    </Box>
  )
}

DetailsForm.propTypes = {
  sx: PropTypes.object
}

export default DetailsForm
