import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import TravelForm from '../../components/TravelForm'

import {
  getSelector as getSelectorTravel,
  actionCreatorGet as actionCreatorGetTravel,
  actionCreatorUpdate as actionCreatorUpdateTravel
} from '../../state/travels'

import {
  getAllSelector as getAllSelectorDetails,
  actionCreatorGetAll as actionCreatorGetAllDetails
} from '../../state/details'

export const PageAdminTravelsEdit = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()
  const { travelId } = useParams()
  const { pathname } = useLocation()
  const travelsListPath = pathname.replace(`/${travelId}`, '')

  const dispatch = useDispatch()

  const getTravelState = useSelector(getSelectorTravel)
  const getAllDetailsState = useSelector(getAllSelectorDetails)

  const methods = useForm({
    defaultValues: {
      details: []
    }
  })
  const { handleSubmit, reset } = methods

  React.useEffect(() => {
    reset(getTravelState.value)
  }, [getTravelState.value, reset])

  React.useEffect(() => {
    dispatch(actionCreatorGetTravel(travelId))
    dispatch(actionCreatorGetAllDetails())
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (getTravelState.loading) return
    if (getTravelState.value !== null) return
    navigate(travelsListPath)
  }, [travelsListPath, getTravelState, navigate])

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
        Edit travel
      </Typography>
      <FormProvider
        {...methods}
      >
        <TravelForm
          details={getAllDetailsState.value || []}
          onSubmit={handleSubmit(async (data) => {
            await dispatch(actionCreatorUpdateTravel(travelId, data))
            navigate(-1)
          })}
        />
      </FormProvider>
    </Box>
  )
}

PageAdminTravelsEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminTravelsEdit
