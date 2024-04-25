import { request } from '../request';

/** get Job page */
export function fetchGetJobBatchList(params?: Api.JobBatch.JobBatchSearchParams) {
  return request<Api.JobBatch.JobBatchList>({
    url: '/job/batch/list',
    method: 'get',
    params
  });
}
