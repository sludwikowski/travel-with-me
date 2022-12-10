import React from 'react'

const initialContextState = {
  details: null
}

export const DetailsContext = React.createContext(initialContextState)

export const useDetails = () => {
  const detailsContextValue = React.useContext(DetailsContext)
  return detailsContextValue
}

export const DetailsContextProvider = DetailsContext.Provider

export default DetailsContextProvider
