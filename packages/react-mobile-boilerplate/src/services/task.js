import requestClient from '../libs/network'
import { QUERY_FREE_TASKS_URL } from '../constants/apis'

export const fetchFreeTasks = async () => {
  const ret = await requestClient.post(QUERY_FREE_TASKS_URL)
  if (ret) {
    return ret.result || []
  }
  return []
}
