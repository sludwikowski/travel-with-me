import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

import YesNoDialog from '../../components/YesNoDialog'

import { getAllSelector, actionCreatorGetAll, actionCreatorRemove } from '../../state/details'

export const PageAdminDetails = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const [detailIdToDelete, setDetailIdToDelete] = React.useState(null)

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
        ADD NEW DETAILS
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
              <TableCell align={'center'}>Actions</TableCell>
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
                <TableCell align={'center'}>
                  <Tooltip title={'Edit'}>
                    <IconButton
                      color={'secondary'}
                      onClick={() => navigate(detail.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Delete'}>
                    <IconButton
                      color={'secondary'}
                      onClick={() => setDetailIdToDelete(detail.id)}
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
        open={detailIdToDelete !== null}
        onAccept={async () => {
          await dispatch(actionCreatorRemove(detailIdToDelete))
          setDetailIdToDelete(null)
          await dispatch(actionCreatorGetAll())
        }}
        onClose={() => setDetailIdToDelete(null)}
        slotTitle={'Confirm deletion'}
        slotText={'After successful deletion item cant be recovered!'}
        yesText={'Confirm'}
        noText={'Cancel'}
      />
    </Box>
  )
}

PageAdminDetails.propTypes = {
  sx: PropTypes.object
}

export default PageAdminDetails
