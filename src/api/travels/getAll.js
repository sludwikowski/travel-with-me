import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl, objectToArray } from '../../api'

import { TRAVELS_KEY } from './const'

export const getAll = async () => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(TRAVELS_KEY))
  return objectToArray(rawData)
}

export default getAll
