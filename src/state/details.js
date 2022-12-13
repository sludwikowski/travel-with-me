import { combineReducers } from 'redux'

import { createAsyncDuck } from './utils/createAsyncDuck'

import {
  get as getDetailsAPICall,
  getAll as getAllDetailsAPICall,
  create as createDetailAPICall,
  update as updateDetailAPICall,
  remove as removeDetailAPICall
}
  from '../api/details'

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
  actionTypes: actionTypesGet,
  actionCreators: { async: actionCreatorGet },
  selector: getSelector,
  reducer: getReducer
} = createAsyncDuck({
  duckName: 'details/get',
  asyncFunction: getDetailsAPICall,
  ...loadersCallbacks('Loading details...')
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

export const {
  actionTypes: actionTypesCreate,
  actionCreators: { async: actionCreatorCreate },
  selector: createSelector,
  reducer: createReducer
} = createAsyncDuck({
  duckName: 'details/create',
  asyncFunction: createDetailAPICall,
  ...loadersCallbacks('Creating detail...')
})

export const {
  actionTypes: actionTypesUpdate,
  actionCreators: { async: actionCreatorUpdate },
  selector: updateSelector,
  reducer: updateReducer
} = createAsyncDuck({
  duckName: 'details/update',
  asyncFunction: updateDetailAPICall,
  ...loadersCallbacks('Updating details...')
})

export const {
  actionTypes: actionTypesRemove,
  actionCreators: { async: actionCreatorRemove },
  selector: removeSelector,
  reducer: removeReducer
} = createAsyncDuck({
  duckName: 'details/remove',
  asyncFunction: removeDetailAPICall,
  ...loadersCallbacks('Removing details...')
})
export const detailsReducer = combineReducers({
  get: getReducer,
  getAll: getAllReducer,
  create: createReducer,
  update: updateReducer,
  remove: removeReducer
})

export default detailsReducer
