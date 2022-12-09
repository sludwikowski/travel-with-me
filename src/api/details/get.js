import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { DETAILS_KEY } from './const'

export const get = async (detailId) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(DETAILS_KEY + '/' + detailId))
  return {
    id: detailId,
    ...detail
  }
}

export default get
