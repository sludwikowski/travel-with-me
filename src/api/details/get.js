import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl, objectToArray } from '../../api'

import { DETAILS_KEY } from './const'

export const get = async (travelId) => {
  const rawData = await makeAuthorizedRequest(makeApiUrl(DETAILS_KEY + '/' + travelId))
  return objectToArray(rawData)
}

export default get
