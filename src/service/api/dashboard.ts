import { request } from '../request';

/** Version */
export function fetchCardCount() {
  return request<Api.Dashboard.CardCount>({
    url: '/dashboard/task-retry-job',
    method: 'get'
  });
}
