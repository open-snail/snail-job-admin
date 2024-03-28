import { request } from '../request';

/** Task Retry Job */
export function fetchCardCount() {
  return request<Api.Dashboard.CardCount>({
    url: '/dashboard/task-retry-job',
    method: 'get'
  });
}

/** Retry Line */
export function fetchRetryLine(params?: Api.Dashboard.DashboardLineParams) {
  return request<Api.Dashboard.DashboardLine>({
    url: '/dashboard/retry/line',
    method: 'get',
    params
  });
}

/** Job Line */
export function fetchJobLine(params?: Api.Dashboard.DashboardLineParams) {
  return request<Api.Dashboard.DashboardLine>({
    url: '/dashboard/job/line',
    method: 'get',
    params
  });
}
