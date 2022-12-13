import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

import { getAllSelector, actionCreatorGetAll } from '../../state/details'

export const PageAdminDetails = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const getAllDetailsState = useSelector(getAllSelector)

  React.useEffect(() => {
    dispatch(actionCreatorGetAll())
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        paddingTop: 2,
        paddingBottom: 2,
        ...sx
      }}
      {...otherProps}
    >
      <Button
        color={'secondary'}
        variant={'contained'}
        sx={{ width: '100%', marginBottom: 2 }}
        onClick={() => navigate('new')}
        startIcon={<AddIcon />}
      >
        ADD NEW LESSON
      </Button>
      <TableContainer
        component={Paper}
      >
        <Table
          sx={{
            width: '100%',
            paddingTop: 2,
            paddingBottom: 2
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align={'right'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllDetailsState.value && getAllDetailsState.value.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>
                  {
                    detail.type === 'image' ?
                      <CameraAltIcon/>
                      :
                      detail.type
                  }
                </TableCell>
                <TableCell
                  component={'th'}
                  scope={'row'}
                >
                  {detail.title}
                </TableCell>
                <TableCell align={'right'}>
                  <Tooltip title={'Edit'}>
                    <IconButton
                      color={'secondary'}
                      onClick={() => navigate(detail.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Delete'}>
                    <IconButton color={'secondary'}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

PageAdminDetails.propTypes = {
  sx: PropTypes.object
}

export default PageAdminDetails
