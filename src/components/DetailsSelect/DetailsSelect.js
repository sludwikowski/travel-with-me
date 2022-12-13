import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, MenuItem, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material'
import {
  Delete as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material'

const move = (array, fromIndex, toIndex) => {
  const target = array[fromIndex]
  const arrayWithoutTarget = array.slice(0, fromIndex).concat(array.slice(fromIndex + 1))
  const result = arrayWithoutTarget.slice(0, toIndex).concat(target).concat(arrayWithoutTarget.slice(toIndex))
  return result
}

export const DetailsSelect = (props) => {
  const {
    sx,
    onChange,
    value,
    options,
    ...otherProps
  } = props

  const selectedDetails = value
    .map((detailId) => options.find((detail) => detail.id === detailId))
    .filter((detail) => detail !== undefined)
  const filteredOptions = options.filter((option) => !value.includes(option.id))

  const add = React.useCallback((detailId) => onChange(value.concat(detailId)), [onChange, value])
  const remove = React.useCallback((detailId) => onChange(value.filter((id) => id !== detailId)), [onChange, value])
  const moveUp = React.useCallback((detailId) => {
    const currentIndex = value.indexOf(detailId)
    const newValue = move(value, currentIndex, currentIndex - 1)
    onChange(newValue)
  }, [onChange, value])
  const moveDown = React.useCallback((detailId) => {
    const currentIndex = value.indexOf(detailId)
    const newValue = move(value, currentIndex, currentIndex + 1)
    onChange(newValue)
  }, [onChange, value])

  return (
    <>
      <Autocomplete
        onChange={(e, option) => {
          if (!option) return
          add(option.id)
        }}
        options={filteredOptions}
        getOptionLabel={(option) => option.title}
        sx={{ width: '100%' }}
        renderOption={(props, option) => (
          <MenuItem
            key={option.id}
            {...props}
          >
            {option.title}
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Details'}
            sx={{ width: '100%', marginBottom: 2 }}
            size={'small'}
            {...otherProps}
          />
        )}
      />
      <List>
        {
          selectedDetails && selectedDetails.map((detail, i, arr) => {
            return (
              <ListItem
                key={detail.id}
                sx={{ paddingRight: 18 }}
                secondaryAction={
                  <>
                    <IconButton
                      color={'secondary'}
                      disabled={i === 0}
                      onClick={() => moveUp(detail.id)}
                    >
                      <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton
                      color={'secondary'}
                      disabled={i === arr.length - 1}
                      onClick={() => moveDown(detail.id)}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                    <IconButton
                      color={'secondary'}
                      onClick={() => remove(detail.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary={detail.title}
                />
              </ListItem>
            )
          })
        }
      </List>
    </>
  )
}

export const DetailOptionsPropType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
})).isRequired

DetailsSelect.propTypes = {
  sx: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: DetailOptionsPropType
}

export default DetailsSelect
