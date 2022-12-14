import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartOpen: false,
  cart: [],
  travels: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setTravels: (state, action) => {
      state.travels = action.payload
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.travel]
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((travel) => travel.id !== action.payload.id)
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((travel) => {
        if (travel.id === action.payload.id) {
          travel.count++
        }
        return travel
      })
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((travel) => {
        if (travel.id === action.payload.id && travel.count > 1) {
          travel.count--
        }
        return travel
      })
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen
    }
  }
})

export const {
  setTravels,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen
} = cartSlice.actions

export default cartSlice.reducer
