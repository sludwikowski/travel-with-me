import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

import YesNoDialog from '../../components/YesNoDialog/YesNoDialog'

import { getAllSelector, actionCreatorGetAll, actionCreatorRemove } from '../../state/travels'

export const PageAdminTravels = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const [travelIdToDelete, setTravelIdToDelete] = React.useState(null)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const getAllTravelsState = useSelector(getAllSelector)

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
        variant={'contained'}
        color={'secondary'}
        sx={{ width: '100%', marginBottom: 2 }}
        onClick={() => navigate('new')}
        startIcon={<AddIcon />}
      >
        ADD NEW TRAVEL
      </Button>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: '100%' }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align={'right'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllTravelsState.value && getAllTravelsState.value.map((travel) => (
              <TableRow
                key={travel.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {travel.category}
                </TableCell>
                <TableCell>{travel.title}</TableCell>
                <TableCell align={'right'}>
                  <Tooltip title={'Edit'}>
                    <IconButton
                      color={'secondary'}
                      onClick={() => navigate(travel.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Delete'}>
                    <IconButton
                      color={'secondary'}
                      onClick={() => setTravelIdToDelete(travel.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <YesNoDialog
        open={travelIdToDelete !== null}
        onAccept={async () => {
          await dispatch(actionCreatorRemove(travelIdToDelete))
          setTravelIdToDelete(null)
          await dispatch(actionCreatorGetAll())
        }}
        onClose={() => setTravelIdToDelete(null)}
        slotTitle={'Confirm deletion'}
        slotText={'After successful deletion item cant be recovered!'}
        yesText={'Confirm'}
        noText={'Cancel'}
      />
    </Box>
  )
}

PageAdminTravels.propTypes = {
  sx: PropTypes.object
}

export default PageAdminTravels
