import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import loadersReducer from './state/loaders'
import detailsReducer from './state/details'
import travelsReducer from './state/travels'
import cartReducer from './state/cartSlice'

const rootReducer = combineReducers({
  loaders: loadersReducer,
  details: detailsReducer,
  travels: travelsReducer,
  cart: cartReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
