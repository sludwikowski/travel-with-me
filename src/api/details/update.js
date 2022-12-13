import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { DETAILS_KEY } from './const'

export const update = async (detailId, data) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(DETAILS_KEY + '/' + detailId), {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  return detail
}

export default update
