import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import TravelForm from '../../components/TravelForm'

import { actionCreatorCreate as actionCreatorCreateTravel } from '../../state/travels'
import {
  getAllSelector as getAllSelectorDetails,
  actionCreatorGetAll as actionCreatorGetAllDetails
} from '../../state/details'

export const PageAdminTravelsNew = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const getAllDetailsState = useSelector(getAllSelectorDetails)

  const methods = useForm({
    defaultValues: {
      details: []
    }
  })
  const { handleSubmit } = methods

  React.useEffect(() => {
    dispatch(actionCreatorGetAllDetails())
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: 2,
        ...sx
      }}
      {...otherProps}
    >
      <Typography
        sx={{ width: '100%', marginBottom: 2, textAlign: 'center' }}
        variant={'h4'}
      >
        Add new travel
      </Typography>
      <FormProvider
        {...methods}
      >
        <TravelForm
          details={getAllDetailsState.value || []}
          onSubmit={handleSubmit(async (data) => {
            await dispatch(actionCreatorCreateTravel(data))
            navigate(-1)
          })}
        />
      </FormProvider>
    </Box>
  )
}

PageAdminTravelsNew.propTypes = {
  sx: PropTypes.object
}

export default PageAdminTravelsNew
