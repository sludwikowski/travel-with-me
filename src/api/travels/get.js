import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { TRAVELS_KEY } from './const'

export const get = async (travelId) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(TRAVELS_KEY + '/' + travelId))
  return {
    id: travelId,
    ...detail
  }
}

export default get
