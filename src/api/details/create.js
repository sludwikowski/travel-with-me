import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { DETAILS_KEY } from './const'

export const create = async (data) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(DETAILS_KEY), {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return detail
}

export default create
