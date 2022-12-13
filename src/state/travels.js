import { combineReducers } from 'redux'

import { createAsyncDuck } from './utils/createAsyncDuck'

import {
  get as getTravelsAPICall,
  getAll as getAllTravelsAPICall,
  create as createTravelAPICall,
  update as updateTravelAPICall,
  remove as removeTravelAPICall
} from '../api/travels'

import {
  createActionSetLoading,
  createActionSetError,
  createActionRemoveLoading
} from './loaders'

const loadersCallbacks = (message) => ({
  callbackStart: ({ dispatch }) => dispatch(createActionSetLoading(message)),
  callbackRejected: ({ error, dispatch }) => dispatch(createActionSetError(error.message || error.data.error.message)),
  callbackFinally: ({ dispatch }) => dispatch(createActionRemoveLoading(message))
})

export const {
  actionTypes: actionTypesGet,
  actionCreators: { async: actionCreatorGet },
  selector: getSelector,
  reducer: getReducer
} = createAsyncDuck({
  duckName: 'travels/get',
  asyncFunction: getTravelsAPICall,
  ...loadersCallbacks('Loading travel...')
})

export const {
  actionTypes: actionTypesGetAll,
  actionCreators: { async: actionCreatorGetAll },
  selector: getAllSelector,
  reducer: getAllReducer
} = createAsyncDuck({
  duckName: 'travels/getAll',
  asyncFunction: getAllTravelsAPICall,
  ...loadersCallbacks('Loading all travels...')
})

export const {
  actionTypes: actionTypesCreate,
  actionCreators: { async: actionCreatorCreate },
  selector: createSelector,
  reducer: createReducer
} = createAsyncDuck({
  duckName: 'travels/create',
  asyncFunction: createTravelAPICall,
  ...loadersCallbacks('Creating travel...')
})

export const {
  actionTypes: actionTypesUpdate,
  actionCreators: { async: actionCreatorUpdate },
  selector: updateSelector,
  reducer: updateReducer
} = createAsyncDuck({
  duckName: 'travels/update',
  asyncFunction: updateTravelAPICall,
  ...loadersCallbacks('Updating travel...')
})

export const {
  actionTypes: actionTypesRemove,
  actionCreators: { async: actionCreatorRemove },
  selector: removeSelector,
  reducer: removeReducer
} = createAsyncDuck({
  duckName: 'travels/remove',
  asyncFunction: removeTravelAPICall,
  ...loadersCallbacks('Removing travel...')
})

export const travelsReducer = combineReducers({
  get: getReducer,
  getAll: getAllReducer,
  create: createReducer,
  update: updateReducer,
  remove: removeReducer
})

export default travelsReducer
