import { get } from './'

export const getMultiple = async (detailIds) => {
  const requestsPromises = detailIds.map((detailIds) => get(detailIds))

  return Promise.all(requestsPromises)
}

export default getMultiple
