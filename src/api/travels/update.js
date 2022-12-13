import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { TRAVELS_KEY } from './const'

export const update = async (travelId, data) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(TRAVELS_KEY + '/' + travelId), {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  return detail
}

export default update
