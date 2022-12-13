import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { TRAVELS_KEY } from './const'

export const create = async (data) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(TRAVELS_KEY), {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return detail
}

export default create
