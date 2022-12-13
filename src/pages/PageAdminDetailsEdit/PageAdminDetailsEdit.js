import React from 'react'
import PropTypes from 'prop-types'

import { useForm, FormProvider } from 'react-hook-form'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import DetailsForm from '../../components/DetailsForm'

import {
  getSelector, actionCreatorGet,
  actionCreatorUpdate
} from '../../state/details'

export const PageAdminDetailsEdit = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()
  const { detailId } = useParams()
  const { pathname } = useLocation()
  const detailsListPath = pathname.replace(`/${detailId}`, '')

  const dispatch = useDispatch()

  const getDetailState = useSelector(getSelector)

  const methods = useForm({
    defaultValues: {
      type: 'image'
    }
  })
  const { handleSubmit, reset } = methods

  React.useEffect(() => {
    reset(getDetailState.value)
  }, [getDetailState.value, reset])

  React.useEffect(() => {
    dispatch(actionCreatorGet(detailId))
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (getDetailState.loading) return
    if (getDetailState.value !== null) return
    navigate(detailsListPath)
  }, [detailsListPath, getDetailState, navigate])

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
        Edit details
      </Typography>
      <FormProvider
        {...methods}
      >
        <DetailsForm
          onSubmit={handleSubmit(async (data) => {
            await dispatch(actionCreatorUpdate(detailId, data))
            navigate(-1)
          })}
        />
      </FormProvider>
    </Box>

  )
}

PageAdminDetailsEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminDetailsEdit
