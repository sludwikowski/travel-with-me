import { makeAuthorizedRequest } from '../../auth'

import { makeApiUrl } from '../../api'

import { TRAVELS_KEY } from './const'

export const remove = async (travelsId) => {
  const detail = await makeAuthorizedRequest(makeApiUrl(TRAVELS_KEY + '/' + travelsId), {
    method: 'DELETE'
  })
  return detail
}

export default remove
