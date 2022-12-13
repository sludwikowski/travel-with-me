import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl, objectToArray } from '../../api'

import { DETAILS_KEY } from './const'

export const getAll = async () => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(DETAILS_KEY))
  return objectToArray(rawData)
}

export default getAll
