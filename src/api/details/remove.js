import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { DETAILS_KEY } from './const'

export const remove = async (detailId) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(DETAILS_KEY + '/' + detailId), {
    method: 'DELETE'
  })
  return detail
}

export default remove
