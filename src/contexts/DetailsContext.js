import React from 'react'

const initialContextState = {
  lessons: null
}

export const DetailsContext = React.createContext(initialContextState)

export const useLessons = () => {
  const detailsContextValue = React.useContext(DetailsContext)
  return detailsContextValue
}

export const DetailContextProvider = DetailsContext.Provider

export default DetailContextProvider
