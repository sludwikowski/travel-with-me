import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import loadersReducer from './state/loaders'
import detailsReducer from './state/details'
import travelsReducer from './state/travels'

const rootReducer = combineReducers({
  loaders: loadersReducer,
  details: detailsReducer,
  travels: travelsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
