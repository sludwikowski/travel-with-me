import { combineReducers } from 'redux'

import { createAsyncDuck } from './utils/createAsyncDuck'

import { getAll as getAllDetailsAPICall } from '../api/details'

import {
  createActionSetLoading,
  createActionSetError,
  createActionRemoveLoading
} from './loaders'

const loadersCallbacks = (message) => ({
  callbackStart: ({ dispatch }) => dispatch(createActionSetLoading(message)),
  callbackRejected: ({ error, dispatch }) => dispatch(createActionSetError(error.message || error.data.error.message)),
  callbackFinally: ({ dispatch }) => dispatch(createActionRemoveLoading())
})

export const {
  actionTypes: actionTypesGetAll,
  actionCreators: { async: actionCreatorGetAll },
  selector: getAllSelector,
  reducer: getAllReducer
} = createAsyncDuck({
  duckName: 'details/getAll',
  asyncFunction: getAllDetailsAPICall,
  ...loadersCallbacks('Lading all details...')
})

export const detailsReducer = combineReducers({
  getAll: getAllReducer
})

export default detailsReducer
